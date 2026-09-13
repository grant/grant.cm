import assert from 'node:assert/strict';
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {afterEach, describe, it} from 'node:test';
import {S3Client} from '@aws-sdk/client-s3';
import {
  createObjectKey,
  detectImageType,
  IssueAssetService,
  loadR2Config,
  MAX_IMAGE_BYTES,
  R2Config,
  validateNamespace,
} from '../src/issueAssets';
import {parseArguments} from '../src/uploadScreenshot';

const config: R2Config = {
  accountId: 'account',
  accessKeyId: 'access',
  secretAccessKey: 'secret',
  bucket: 'grantcm-issue-assets',
  publicUrl: 'https://assets.grantcm.com',
};
const temporaryDirectories: string[] = [];

void afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map(directory => rm(directory, {recursive: true, force: true})),
  );
});

void describe('image validation', () => {
  void it('detects supported formats using their file signatures', () => {
    assert.deepEqual(
      detectImageType(Buffer.from('89504e470d0a1a0a00000000', 'hex')),
      {extension: 'png', contentType: 'image/png'},
    );
    assert.deepEqual(detectImageType(Buffer.from('ffd8ff00', 'hex')), {
      extension: 'jpg',
      contentType: 'image/jpeg',
    });
    assert.deepEqual(detectImageType(Buffer.from('GIF89a')), {
      extension: 'gif',
      contentType: 'image/gif',
    });
    assert.deepEqual(detectImageType(Buffer.from('RIFF0000WEBP')), {
      extension: 'webp',
      contentType: 'image/webp',
    });
    assert.equal(detectImageType(Buffer.from('not an image')), undefined);
  });

  void it('rejects invalid namespaces', () => {
    assert.equal(validateNamespace('issue-210'), 'issue-210');
    assert.throws(() => validateNamespace('../escape'), /Issue or run ID/);
  });
});

void describe('configuration', () => {
  void it('reports every missing secret without exposing values', () => {
    assert.throws(
      () => loadR2Config({}),
      /R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY/,
    );
  });

  void it('uses the grantcm bucket and domain defaults', () => {
    const loaded = loadR2Config({
      R2_ACCOUNT_ID: 'account',
      R2_ACCESS_KEY_ID: 'access',
      R2_SECRET_ACCESS_KEY: 'secret',
    });
    assert.equal(loaded.bucket, 'grantcm-issue-assets');
    assert.equal(loaded.publicUrl, 'https://assets.grantcm.com');
  });
});

void describe('object keys', () => {
  void it('creates immutable names under the issue namespace', () => {
    const bytes = Buffer.from('89504e470d0a1a0a00000000', 'hex');
    const key = createObjectKey(
      '210',
      'Home Page Final.PNG',
      bytes,
      {extension: 'png', contentType: 'image/png'},
      '82de0471-74cb-4a83-a2cd-f32b7f2af501',
    );
    assert.match(
      key,
      /^issues\/210\/82de0471-74cb-4a83-a2cd-f32b7f2af501-[a-f0-9]{12}-home-page-final\.png$/,
    );
  });
});

void describe('IssueAssetService', () => {
  void it('uploads a validated image with immutable cache controls', async () => {
    const directory = await makeTemporaryDirectory();
    const filename = path.join(directory, 'capture.txt');
    await writeFile(filename, Buffer.from('89504e470d0a1a0a00000000', 'hex'));
    const client = new FakeS3Client();
    const service = new IssueAssetService(client.asS3Client(), config);

    const url = await service.uploadFile(filename, '210');

    assert.match(
      url,
      /^https:\/\/assets\.grantcm\.com\/issues\/210\/.+-capture\.png$/,
    );
    assert.deepEqual(client.commandNames, ['PutObjectCommand']);
    assert.equal(client.inputs[0].Bucket, 'grantcm-issue-assets');
    assert.equal(client.inputs[0].ContentType, 'image/png');
    assert.equal(
      client.inputs[0].CacheControl,
      'public, max-age=31536000, immutable',
    );
    assert.equal(client.inputs[0].IfNoneMatch, '*');
  });

  void it('rejects oversized files before uploading', async () => {
    const directory = await makeTemporaryDirectory();
    const filename = path.join(directory, 'large.png');
    await writeFile(filename, Buffer.alloc(MAX_IMAGE_BYTES + 1));
    const client = new FakeS3Client();
    const service = new IssueAssetService(client.asS3Client(), config);

    await assert.rejects(() => service.uploadFile(filename, '210'), /10 MiB/);
    assert.deepEqual(client.commandNames, []);
  });

  void it('checks the bucket and cleans up its health object', async () => {
    const client = new FakeS3Client();
    const service = new IssueAssetService(client.asS3Client(), config);

    await service.healthCheck();

    assert.deepEqual(client.commandNames, [
      'HeadBucketCommand',
      'PutObjectCommand',
      'HeadObjectCommand',
      'DeleteObjectCommand',
    ]);
    assert.match(
      String(client.inputs[1].Key),
      /^issues\/health\/.+-health\.png$/,
    );
    assert.equal(client.inputs[1].Key, client.inputs[3].Key);
  });
});

void describe('CLI arguments', () => {
  void it('parses upload and health commands', () => {
    assert.deepEqual(
      parseArguments(['capture.png', '--issue', '210', '--url-only']),
      {
        command: 'upload',
        filename: 'capture.png',
        issue: '210',
        urlOnly: true,
      },
    );
    assert.deepEqual(parseArguments(['health']), {command: 'health'});
  });

  void it('requires an issue or run ID for uploads', () => {
    assert.throws(() => parseArguments(['capture.png']), /Missing --issue/);
  });
});

class FakeS3Client {
  readonly commandNames: string[] = [];
  readonly inputs: Array<Record<string, unknown>> = [];

  async send(command: {
    constructor: {name: string};
    input: Record<string, unknown>;
  }): Promise<Record<string, never>> {
    this.commandNames.push(command.constructor.name);
    this.inputs.push(command.input);
    return {};
  }

  asS3Client(): S3Client {
    return this as unknown as S3Client;
  }
}

async function makeTemporaryDirectory(): Promise<string> {
  const directory = await mkdtemp(path.join(tmpdir(), 'issue-assets-'));
  temporaryDirectories.push(directory);
  return directory;
}
