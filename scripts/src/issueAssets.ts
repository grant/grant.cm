import {
  DeleteObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {createHash, randomUUID} from 'node:crypto';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';

export const DEFAULT_BUCKET = 'grantcm-issue-assets';
export const DEFAULT_PUBLIC_URL = 'https://assets.grantcm.com';
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicUrl: string;
}

export interface ImageType {
  extension: 'png' | 'jpg' | 'gif' | 'webp';
  contentType: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp';
}

export function loadR2Config(
  environment: NodeJS.ProcessEnv = process.env,
): R2Config {
  const required = [
    'R2_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
  ] as const;
  const missing = required.filter(name => !environment[name]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable${missing.length === 1 ? '' : 's'}: ${missing.join(
        ', ',
      )}. Configure them as Cursor Cloud Agent environment secrets.`,
    );
  }

  const publicUrl =
    environment.R2_PUBLIC_URL?.replace(/\/+$/, '') ?? DEFAULT_PUBLIC_URL;
  try {
    new URL(publicUrl);
  } catch {
    throw new Error('R2_PUBLIC_URL must be a valid absolute URL.');
  }

  return {
    accountId: environment.R2_ACCOUNT_ID!,
    accessKeyId: environment.R2_ACCESS_KEY_ID!,
    secretAccessKey: environment.R2_SECRET_ACCESS_KEY!,
    bucket: environment.R2_BUCKET ?? DEFAULT_BUCKET,
    publicUrl,
  };
}

export function createR2Client(config: R2Config): S3Client {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

export function detectImageType(bytes: Uint8Array): ImageType | undefined {
  if (
    bytes.length >= 8 &&
    matches(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  ) {
    return {extension: 'png', contentType: 'image/png'};
  }
  if (
    bytes.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff
  ) {
    return {extension: 'jpg', contentType: 'image/jpeg'};
  }
  const header = Buffer.from(bytes.subarray(0, 6)).toString('ascii');
  if (header === 'GIF87a' || header === 'GIF89a') {
    return {extension: 'gif', contentType: 'image/gif'};
  }
  if (
    bytes.length >= 12 &&
    Buffer.from(bytes.subarray(0, 4)).toString('ascii') === 'RIFF' &&
    Buffer.from(bytes.subarray(8, 12)).toString('ascii') === 'WEBP'
  ) {
    return {extension: 'webp', contentType: 'image/webp'};
  }
  return undefined;
}

export function validateNamespace(value: string): string {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(value)) {
    throw new Error(
      'Issue or run ID must be 1-128 characters using letters, numbers, ".", "_" or "-".',
    );
  }
  return value;
}

export function createObjectKey(
  namespace: string,
  filename: string,
  bytes: Uint8Array,
  imageType: ImageType,
  uniqueId = randomUUID(),
): string {
  const safeNamespace = validateNamespace(namespace);
  const stem =
    path
      .basename(filename, path.extname(filename))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60) || 'screenshot';
  const digest = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  return `issues/${safeNamespace}/${uniqueId}-${digest}-${stem}.${imageType.extension}`;
}

export class IssueAssetService {
  constructor(
    private readonly client: S3Client,
    private readonly config: R2Config,
  ) {}

  async uploadFile(filename: string, namespace: string): Promise<string> {
    let fileStats;
    try {
      fileStats = await stat(filename);
    } catch {
      throw new Error(
        `Image file does not exist or cannot be read: ${filename}`,
      );
    }
    if (!fileStats.isFile()) {
      throw new Error(`Image path is not a regular file: ${filename}`);
    }
    if (fileStats.size === 0) {
      throw new Error('Image file is empty.');
    }
    if (fileStats.size > MAX_IMAGE_BYTES) {
      throw new Error(
        `Image is ${formatMiB(fileStats.size)}, exceeding the 10 MiB limit.`,
      );
    }

    const bytes = await readFile(filename);
    const imageType = detectImageType(bytes);
    if (!imageType) {
      throw new Error(
        'Unsupported image content. Expected a PNG, JPEG, GIF, or WebP file.',
      );
    }
    const key = createObjectKey(namespace, filename, bytes, imageType);

    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.config.bucket,
          Key: key,
          Body: bytes,
          ContentType: imageType.contentType,
          CacheControl: 'public, max-age=31536000, immutable',
          IfNoneMatch: '*',
        }),
      );
    } catch (error) {
      throw new Error(`R2 upload failed: ${describeError(error)}`);
    }

    return `${this.config.publicUrl}/${key
      .split('/')
      .map(encodeURIComponent)
      .join('/')}`;
  }

  async healthCheck(): Promise<void> {
    const key = `issues/health/${randomUUID()}-health.png`;
    const pixel = Buffer.from(
      '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d49444154789c6360000002000154a24f5d0000000049454e44ae426082',
      'hex',
    );
    try {
      await this.client.send(
        new HeadBucketCommand({Bucket: this.config.bucket}),
      );
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.config.bucket,
          Key: key,
          Body: pixel,
          ContentType: 'image/png',
          CacheControl: 'no-store',
          IfNoneMatch: '*',
        }),
      );
      try {
        await this.client.send(
          new HeadObjectCommand({Bucket: this.config.bucket, Key: key}),
        );
      } finally {
        await this.client.send(
          new DeleteObjectCommand({Bucket: this.config.bucket, Key: key}),
        );
      }
    } catch (error) {
      throw new Error(`R2 health check failed: ${describeError(error)}`);
    }
  }
}

function matches(bytes: Uint8Array, signature: number[]): boolean {
  return signature.every((value, index) => bytes[index] === value);
}

function formatMiB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}

function describeError(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  return 'Unknown R2 error';
}
