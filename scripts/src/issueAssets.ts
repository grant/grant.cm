import {Storage} from '@google-cloud/storage';
import {createHash, randomUUID} from 'node:crypto';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';

export const DEFAULT_BUCKET = 'grantcm-issue-assets';
export const DEFAULT_PUBLIC_URL = 'https://assets.grantcm.com';
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export interface GcsConfig {
  bucket: string;
  publicUrl: string;
  projectId?: string;
  credentials?: {
    client_email: string;
    private_key: string;
  };
}

export interface ImageType {
  extension: 'png' | 'jpg' | 'gif' | 'webp';
  contentType: 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp';
}

interface GcsFile {
  save(
    bytes: Uint8Array,
    options: {
      resumable: boolean;
      validation: 'crc32c';
      preconditionOpts: {ifGenerationMatch: number};
      metadata: {contentType: string; cacheControl: string};
    },
  ): Promise<unknown>;
  exists(): Promise<[boolean]>;
  delete(options?: {ignoreNotFound?: boolean}): Promise<unknown>;
}

interface GcsBucket {
  getMetadata(): Promise<unknown>;
  file(key: string): GcsFile;
}

export interface GcsStorage {
  bucket(name: string): GcsBucket;
}

/**
 * Loads public bucket settings and optional service-account credentials.
 */
export function loadGcsConfig(
  environment: NodeJS.ProcessEnv = process.env,
): GcsConfig {
  const publicUrl =
    environment.GCS_PUBLIC_URL?.replace(/\/+$/, '') ?? DEFAULT_PUBLIC_URL;
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(publicUrl);
  } catch {
    throw new Error('GCS_PUBLIC_URL must be a valid absolute URL.');
  }
  if (parsedUrl.protocol !== 'https:') {
    throw new Error('GCS_PUBLIC_URL must use HTTPS.');
  }

  const encodedCredentials = environment.GCP_CREDENTIALS;
  if (!encodedCredentials) {
    return {
      bucket: environment.GCS_BUCKET ?? DEFAULT_BUCKET,
      publicUrl,
      projectId: environment.GOOGLE_CLOUD_PROJECT,
    };
  }

  let credentials: Record<string, unknown>;
  try {
    const parsedCredentials: unknown = JSON.parse(encodedCredentials);
    if (
      parsedCredentials === null ||
      typeof parsedCredentials !== 'object' ||
      Array.isArray(parsedCredentials)
    ) {
      throw new Error('invalid shape');
    }
    credentials = parsedCredentials as Record<string, unknown>;
  } catch {
    throw new Error('GCP_CREDENTIALS must contain valid service-account JSON.');
  }
  const clientEmail = credentials.client_email;
  const privateKey = credentials.private_key;
  const projectId = credentials.project_id;
  if (
    typeof clientEmail !== 'string' ||
    typeof privateKey !== 'string' ||
    typeof projectId !== 'string'
  ) {
    throw new Error(
      'GCP_CREDENTIALS must contain client_email, private_key, and project_id.',
    );
  }

  return {
    bucket: environment.GCS_BUCKET ?? DEFAULT_BUCKET,
    publicUrl,
    projectId,
    credentials: {client_email: clientEmail, private_key: privateKey},
  };
}

/**
 * Creates an authenticated GCS client using explicit credentials or ADC.
 */
export function createGcsStorage(config: GcsConfig): GcsStorage {
  return new Storage({
    projectId: config.projectId,
    credentials: config.credentials,
  }) as GcsStorage;
}

/**
 * Detects an allowed image type from its magic bytes.
 */
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

/**
 * Validates an issue or run ID before using it in an object key.
 */
export function validateNamespace(value: string): string {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(value)) {
    throw new Error(
      'Issue or run ID must be 1-128 characters using letters, numbers, ".", "_" or "-".',
    );
  }
  return value;
}

/**
 * Builds a collision-resistant, immutable object key for an image.
 */
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
    private readonly storage: GcsStorage,
    private readonly config: GcsConfig,
  ) {}

  /**
   * Validates and uploads an image, returning its public immutable URL.
   */
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
    if (bytes.length > MAX_IMAGE_BYTES) {
      throw new Error(
        `Image is ${formatMiB(bytes.length)}, exceeding the 10 MiB limit.`,
      );
    }
    const imageType = detectImageType(bytes);
    if (!imageType) {
      throw new Error(
        'Unsupported image content. Expected a PNG, JPEG, GIF, or WebP file.',
      );
    }
    const key = createObjectKey(namespace, filename, bytes, imageType);

    try {
      await this.storage
        .bucket(this.config.bucket)
        .file(key)
        .save(bytes, {
          resumable: false,
          validation: 'crc32c',
          preconditionOpts: {ifGenerationMatch: 0},
          metadata: {
            contentType: imageType.contentType,
            cacheControl: 'public, max-age=7776000, immutable',
          },
        });
    } catch (error) {
      throw new Error(
        `GCS upload failed: ${describeError(error, this.config)}`,
      );
    }

    return `${this.config.publicUrl}/${key
      .split('/')
      .map(encodeURIComponent)
      .join('/')}`;
  }

  /**
   * Verifies bucket access and the full object create/read/delete path.
   */
  async healthCheck(): Promise<void> {
    const key = `issues/health/${randomUUID()}-health.png`;
    const pixel = Buffer.from(
      '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d49444154789c6360000002000154a24f5d0000000049454e44ae426082',
      'hex',
    );
    const bucket = this.storage.bucket(this.config.bucket);
    const file = bucket.file(key);
    try {
      await bucket.getMetadata();
      await file.save(pixel, {
        resumable: false,
        validation: 'crc32c',
        preconditionOpts: {ifGenerationMatch: 0},
        metadata: {contentType: 'image/png', cacheControl: 'no-store'},
      });
      try {
        const [exists] = await file.exists();
        if (!exists) throw new Error('Health-check object was not found.');
      } finally {
        await file.delete({ignoreNotFound: true});
      }
    } catch (error) {
      throw new Error(
        `GCS health check failed: ${describeError(error, this.config)}`,
      );
    }
  }
}

/**
 * Checks whether bytes begin with an exact binary signature.
 */
function matches(bytes: Uint8Array, signature: number[]): boolean {
  return signature.every((value, index) => bytes[index] === value);
}

/**
 * Formats a byte count for actionable file-size errors.
 */
function formatMiB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}

/**
 * Formats a provider error while redacting credential-derived values.
 */
function describeError(error: unknown, config: GcsConfig): string {
  if (!(error instanceof Error)) return 'Unknown GCS error';
  let message = `${error.name}: ${error.message}`;
  const secrets = [
    config.projectId,
    config.credentials?.client_email,
    config.credentials?.private_key,
  ].filter((value): value is string => Boolean(value));
  for (const secret of secrets)
    message = message.split(secret).join('[redacted]');
  return message;
}
