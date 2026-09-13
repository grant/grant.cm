import assert from 'node:assert/strict';
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {afterEach, describe, it} from 'node:test';
import {
  createObjectKey,
  detectImageType,
  GcsStorage,
  IssueAssetService,
  loadGcsConfig,
  MAX_IMAGE_BYTES,
  validateNamespace,
} from '../src/issueAssets';
import {parseArguments} from '../src/uploadScreenshot';

const config = {
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
  void it('uses ADC with the grantcm bucket and domain defaults', () => {
    const loaded = loadGcsConfig({});
    assert.deepEqual(loaded, {
      bucket: 'grantcm-issue-assets',
      publicUrl: 'https://assets.grantcm.com',
      projectId: undefined,
    });
  });

  void it('accepts service-account JSON from a Cursor secret', () => {
    const loaded = loadGcsConfig({
      GCP_CREDENTIALS: JSON.stringify({
        project_id: 'grantcm',
        client_email: 'assets@grantcm.iam.gserviceaccount.com',
        private_key: 'private',
      }),
    });
    assert.equal(loaded.projectId, 'grantcm');
    assert.equal(
      loaded.credentials?.client_email,
      'assets@grantcm.iam.gserviceaccount.com',
    );
    assert.equal(loaded.credentials?.private_key, 'private');
  });

  void it('rejects malformed credentials and non-HTTPS public URLs', () => {
    assert.throws(
      () => loadGcsConfig({GCP_CREDENTIALS: '{broken'}),
      /valid service-account JSON/,
    );
    assert.throws(
      () => loadGcsConfig({GCS_PUBLIC_URL: 'http://assets.grantcm.com'}),
      /must use HTTPS/,
    );
  });
});

void describe('object keys', () => {
  void it('creates immutable names under the issue namespace', () => {
    const bytes = Buffer.from('89504e470d0a1a0a00000000', 'hex');
    const first = createObjectKey(
      '210',
      'Home Page Final.PNG',
      bytes,
      {extension: 'png', contentType: 'image/png'},
      '82de0471-74cb-4a83-a2cd-f32b7f2af501',
    );
    const second = createObjectKey(
      '210',
      'Home Page Final.PNG',
      bytes,
      {extension: 'png', contentType: 'image/png'},
      '98c82ff3-c09b-4e64-9cfd-50e011e3a23b',
    );
    assert.match(
      first,
      /^issues\/210\/82de0471-74cb-4a83-a2cd-f32b7f2af501-[a-f0-9]{12}-home-page-final\.png$/,
    );
    assert.notEqual(first, second);
  });
});

void describe('IssueAssetService', () => {
  void it('uploads a validated image with immutable cache controls', async () => {
    const directory = await makeTemporaryDirectory();
    const filename = path.join(directory, 'capture.txt');
    await writeFile(filename, Buffer.from('89504e470d0a1a0a00000000', 'hex'));
    const storage = new FakeGcsStorage();
    const service = new IssueAssetService(storage, config);

    const url = await service.uploadFile(filename, '210');

    assert.match(
      url,
      /^https:\/\/assets\.grantcm\.com\/issues\/210\/.+-capture\.png$/,
    );
    assert.equal(storage.bucketName, 'grantcm-issue-assets');
    assert.equal(storage.files.length, 1);
    const options = storage.files[0].saveOptions[0];
    assert.equal(options.metadata.contentType, 'image/png');
    assert.equal(
      options.metadata.cacheControl,
      'public, max-age=7776000, immutable',
    );
    assert.equal(options.preconditionOpts.ifGenerationMatch, 0);
  });

  void it('rejects invalid and oversized files before uploading', async () => {
    const directory = await makeTemporaryDirectory();
    const invalidFilename = path.join(directory, 'fake.png');
    const largeFilename = path.join(directory, 'large.png');
    await writeFile(invalidFilename, 'not an image');
    await writeFile(largeFilename, Buffer.alloc(MAX_IMAGE_BYTES + 1));
    const storage = new FakeGcsStorage();
    const service = new IssueAssetService(storage, config);

    await assert.rejects(
      () => service.uploadFile(invalidFilename, '210'),
      /Unsupported image content/,
    );
    await assert.rejects(
      () => service.uploadFile(largeFilename, '210'),
      /10 MiB/,
    );
    assert.deepEqual(storage.files, []);
  });

  void it('checks the bucket and cleans up its health object', async () => {
    const storage = new FakeGcsStorage();
    const service = new IssueAssetService(storage, config);

    await service.healthCheck();

    assert.equal(storage.metadataChecks, 1);
    assert.equal(storage.files.length, 1);
    assert.match(storage.files[0].key, /^issues\/health\/.+-health\.png$/);
    assert.equal(storage.files[0].saveOptions.length, 1);
    assert.equal(storage.files[0].existsChecks, 1);
    assert.equal(storage.files[0].deletes, 1);
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

interface SaveOptions {
  resumable: boolean;
  validation: 'crc32c';
  preconditionOpts: {ifGenerationMatch: number};
  metadata: {contentType: string; cacheControl: string};
}

class FakeGcsFile {
  readonly saveOptions: SaveOptions[] = [];
  existsChecks = 0;
  deletes = 0;

  constructor(readonly key: string) {}

  async save(_bytes: Uint8Array, options: SaveOptions): Promise<void> {
    this.saveOptions.push(options);
  }

  async exists(): Promise<[boolean]> {
    this.existsChecks++;
    return [true];
  }

  async delete(): Promise<void> {
    this.deletes++;
  }
}

class FakeGcsStorage implements GcsStorage {
  bucketName = '';
  metadataChecks = 0;
  readonly files: FakeGcsFile[] = [];

  bucket(name: string) {
    this.bucketName = name;
    return {
      getMetadata: async () => {
        this.metadataChecks++;
      },
      file: (key: string) => {
        const file = new FakeGcsFile(key);
        this.files.push(file);
        return file;
      },
    };
  }
}

async function makeTemporaryDirectory(): Promise<string> {
  const directory = await mkdtemp(path.join(tmpdir(), 'issue-assets-'));
  temporaryDirectories.push(directory);
  return directory;
}
