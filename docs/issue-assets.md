# Screenshot issue assets

`upload-screenshot` stores agent-generated screenshots in the
`grantcm-issue-assets` Google Cloud Storage bucket. It returns a public URL
under `https://assets.grantcm.com` for embedding in GitHub Issues and pull
requests. Generated assets do not belong in Git or Git LFS.

## One-time Google Cloud setup

1. Create a GCS bucket named `grantcm-issue-assets` in the `grantcm` project.
   Uniform bucket-level access is recommended.
2. Create a dedicated service account for Cloud Agent uploads.
3. Create a custom project role containing only `storage.buckets.get`,
   `storage.objects.create`, `storage.objects.get`, and
   `storage.objects.delete`, then grant that role to the service account on
   this bucket only. The bucket permission is required by the health check;
   the object permissions cover upload, verification, and cleanup. An
   object-prefix IAM condition is optional, but it must not restrict
   `storage.buckets.get`.
4. Grant `allUsers` `roles/storage.objectViewer` on the bucket so GitHub can
   display screenshots. Do not grant public write access.
5. Route `assets.grantcm.com` to the public bucket using the existing
   Cloudflare/DNS setup and HTTPS configuration.
6. Add this lifecycle configuration so objects under `issues/` expire after
   90 days:

   ```json
   {
     "rule": [
       {
         "action": {"type": "Delete"},
         "condition": {"age": 90, "matchesPrefix": ["issues/"]}
       }
     ]
   }
   ```

   Apply it with:

   ```bash
   gcloud storage buckets update gs://grantcm-issue-assets \
     --lifecycle-file=path/to/lifecycle.json
   ```

7. Browser JavaScript does not upload assets. If it must directly fetch object
   responses, configure public `GET`/`HEAD` CORS separately. GitHub's image
   proxy and ordinary `<img>` rendering do not require CORS.

## Cursor Cloud Agent authentication

The CLI follows Google Application Default Credentials:

1. `GCP_CREDENTIALS` containing service-account JSON, when configured as a
   Cursor Cloud Agent environment secret.
2. `GOOGLE_APPLICATION_CREDENTIALS` pointing to an injected credential file.
3. Ambient ADC, such as an attached Google service account.

Add `GCP_CREDENTIALS` only to the personal Cursor Cloud Agent environments
where this user-level command should work. The similarly named GitHub Actions
secret is separate and is not automatically available to Cursor agents.

Never put credentials in `.cursor/environment.json`, committed `.env` files,
shell scripts, GitHub Issues, or pull requests. New or restarted Cloud Agents
receive newly configured secrets.

## Personal scope

The uploader does not inspect, collect, or restrict the current Git repository.
The bucket and object namespace are generic across this user's projects.
Access remains personal because only environments carrying the bucket-scoped
credential can upload.

The CLI defaults to the `grantcm-issue-assets` bucket and
`https://assets.grantcm.com`. `GCS_BUCKET` and `GCS_PUBLIC_URL` can override
those non-secret values when testing another environment.

## Verify access

```bash
just upload-screenshot health
```

The command verifies bucket metadata access, uploads and reads a temporary PNG
under `issues/health/`, deletes it, and prints `ok`. Errors identify invalid
configuration or the failed GCS operation while redacting credential values.

## Cursor Cloud Agent workflow

1. Capture a screenshot outside the repository, such as
   `/opt/cursor/artifacts/homepage.png`.
2. Upload it and capture only the immutable public URL:

   ```bash
   SCREENSHOT_URL="$(
     just upload-screenshot /opt/cursor/artifacts/homepage.png \
       --issue 210 \
       --url-only
   )"
   ```

3. Create or update the GitHub Issue or pull request with the available
   GitHub integration.
4. Embed the URL:

   ```markdown
   ![Screenshot](https://assets.grantcm.com/issues/210/unique-name.png)
   ```

Never paste credentials, encode the image as base64, or commit the image.

## Upload behavior

```bash
just upload-screenshot ./screenshot.png --issue 123
```

Accepted content types are PNG, JPEG, GIF, and WebP. Validation uses file
signatures rather than extensions, and files are limited to 10 MiB. Object
keys use this shape:

```text
issues/<issue-or-run-id>/<uuid>-<content-hash>-<safe-name>.<type>
```

UUIDs prevent collisions, the content hash aids identification, and the GCS
generation precondition prevents overwriting an existing object. Uploaded
objects use an immutable 90-day browser cache aligned with the recommended
bucket lifecycle.
