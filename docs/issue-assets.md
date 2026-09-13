# Screenshot issue assets

`upload-screenshot` stores agent-generated screenshots in the
`grantcm-issue-assets` Cloudflare R2 bucket. It returns a public URL under
`https://assets.grantcm.com` for embedding in GitHub Issues and pull requests.
Generated assets do not belong in Git or Git LFS.

## One-time Cloudflare setup

1. Create an R2 bucket named `grantcm-issue-assets`.
2. In the bucket settings, attach the custom domain
   `assets.grantcm.com`.
3. Create an R2 API token with **Object Read & Write** access restricted to
   this bucket. The health check uploads, reads, and deletes a temporary
   object, so all three object operations are required.
4. Add an object lifecycle rule for the `issues/` prefix that expires objects
   after 90 days.
5. If screenshots will be fetched directly by browser JavaScript, add this
   CORS policy. GitHub's image proxy and ordinary `<img>` rendering do not
   require it.

   ```json
   [
     {
       "AllowedOrigins": ["*"],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedHeaders": ["*"],
       "ExposeHeaders": ["ETag"],
       "MaxAgeSeconds": 86400
     }
   ]
   ```

Keep public access on the custom domain. Do not expose the R2 S3 API endpoint
or upload credentials to browsers.

## Cursor Cloud Agent secrets

In the Cursor dashboard, open the Cloud Agent environment used for this
repository and add these environment secrets:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`

Do not put them in `.cursor/environment.json`, `.env` files, shell scripts,
GitHub Issues, or pull requests. New or restarted Cloud Agents receive the
configured secrets.

The CLI defaults to the `grantcm-issue-assets` bucket and
`https://assets.grantcm.com`. `R2_BUCKET` and `R2_PUBLIC_URL` can override
those non-secret values when testing another environment.

## Verify access

From the repository root:

```bash
./upload-screenshot health
```

The command verifies bucket access, uploads and reads a temporary PNG under
`issues/health/`, deletes it, and prints `ok`. Errors identify missing
variables, invalid configuration, or the failed R2 operation without printing
credentials.

## Cursor Cloud Agent workflow

1. Capture a screenshot to an external path such as
   `/opt/cursor/artifacts/homepage.png`.
2. Upload it and capture only the immutable public URL:

   ```bash
   SCREENSHOT_URL="$(
     ./upload-screenshot /opt/cursor/artifacts/homepage.png \
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
./upload-screenshot ./screenshot.png --issue 123
```

Accepted content types are PNG, JPEG, GIF, and WebP. Validation uses file
signatures rather than extensions, and files are limited to 10 MiB. Object
keys use this shape:

```text
issues/<issue-or-run-id>/<uuid>-<content-hash>-<safe-name>.<type>
```

UUIDs prevent collisions, the content hash aids identification, and R2
receives an `If-None-Match: *` precondition so an existing object cannot be
overwritten. Uploaded objects use a one-year immutable browser cache because
every URL is unique; the bucket lifecycle policy can still remove objects
after 90 days.
