# grant.cm

The website [grant.cm](http://grant.cm)

Built with:
- Node
- Typescript
- React
- Next.js
- Tailwind

Deployed with:
- Google Cloud Buildpacks
- Cloud Run

Automated with:
- GitHub Actions CD

### Quickstart

```sh
brew install just
just install
just dev
open http://localhost:8080
```

### Scripts

Develop the site with these scripts:

#### Develop

- `just dev`: Dev mode. Compiles JSX, TypeScript, SCSS.

#### Lint / Test

- `just lint`: Lints this repository
- `just fix`: Fixes all lint issues
- `just clean`: Cleans any built files

#### Build & Deploy

> Note: The site is deployed with GitHub Actions. See the `deployToRun` workflow.

- `just build`: Builds the website for production.
- `just deploy`: Deploys the website to Google Cloud

#### DNS

This website is hosted on Cloud Run, Cloudflare CDN, and Namecheap domain registrar.

- Host: Cloud Run w/ Custom Domains
  - https://console.cloud.google.com/run?project=grantcm
  - https://cloud.google.com/run/docs/mapping-custom-domains
- CDN: Cloudflare CDN
  - https://dash.cloudflare.com/
- Domain Registrar: Namecheap
  - https://ap.www.namecheap.com/Domains/DomainControlPanel/grant.cm/domain/
  - Domain: Nameservers:
    - Custom DNS
      - `edna.ns.cloudflare.com`
      - `stan.ns.cloudflare.com`

The CloudFlare DNS records will look like (with DOMAIN being `grant.cm`):

| Type | Name | Content | Proxy Status |
| --- | --- | --- | --- |
| A | `<DOMAIN>` | `<generated IPv4 (DOMAIN from Cloud Run)>` | DNS Only |
| A | `<DOMAIN>` | `<generated IPv4 (DOMAIN from Cloud Run)>` | DNS Only |
| A | `<DOMAIN>` | `<generated IPv4 (DOMAIN from Cloud Run)>` | DNS Only |
| A | `<DOMAIN>` | `<generated IPv4 (DOMAIN from Cloud Run)>` | DNS Only |
| AAAA | `<DOMAIN>` | `<generated IPv6 (DOMAIN from Cloud Run)>` | DNS Only |
| AAAA | `<DOMAIN>` | `<generated IPv6 (DOMAIN from Cloud Run)>` | DNS Only |
| AAAA | `<DOMAIN>` | `<generated IPv6 (DOMAIN from Cloud Run)>` | DNS Only |
| AAAA | `<DOMAIN>` | `<generated IPv6 (DOMAIN from Cloud Run)>` | DNS Only |
| CNAME | `www` | `<DOMAIN>`  | Proxied |
| TXT | `<DOMAIN>` | `google-site-verification=ZkBjUhfP1hRIEVOXKhEJz3xaQnRPx_8NUxxy9mFX9x0` | DNS Only |

The `www` subdomain redirects `www.DOMAIN` to `DOMAIN` with a proxy.

##### Subdomains

To add a subdomain, create a new Cloud Run service

| Type | Name | Content | Proxy Status |
| --- | --- | --- | --- |
| CNAME | `staging` | `ghs.googlehosted.com` | DNS only

In the Cloud Run UI, Add mapping for your subdomain.

##### Example

| Type | Name | Content |
| --- | --- | --- |
| A | `grant.cm` | `123.12.1.123` |
| A | `grant.cm` | `123.12.1.123` |
| A | `grant.cm` | `123.12.1.123` |
| A | `grant.cm` | `123.12.1.123` |
| AAAA | `grant.cm` | `1000:4660:4804:36::15` |
| AAAA | `grant.cm` | `1000:4660:4804:36::15` |
| AAAA | `grant.cm` | `1000:4660:4804:36::15` |
| AAAA | `grant.cm` | `1000:4660:4804:36::15` |
| CNAME | `www` | `grant.cm` |
| TXT | `grant.cm` | `google-site-verification=ZkBjUhfP1hRIEVOXKhEJz3xaQnRPx_8NUxxy9mFX9x0` |

All of these should be **DNS only** (*Not* **Proxied**).

### Domain mappings

To link the Cloud Run service to the domain registrar, create the domain mapping:

```sh
gcloud run domain-mappings create \
--service grantcm \
--region us-central1 \
--domain grant.cm
```

Describe the mapping to verify it works:

```sh
gcloud run domain-mappings describe \
--region us-central1 \
--domain grant.cm
# Prints DNS records that should be the same as above
```

> Note: It may take up to 24 hours for it to work. If the Run domain mapping is spinning, try deleting it and creating it again.

### GitHub Actions Deploy on Push

You can deploy the website with GitHub Actions.

Here are the rough details:

Create a Service Account with roles:
- Cloud Build Service Agent
- Cloud Run Service Agent
- Compute Engine Service Agent
- Editor
- Service Account User
- Viewer

Download the Service Account key as a JSON file.

Add the file contents as a repo secret called `GCP_CREDENTIALS`. This is used by our deploy workflow, `.github/workflows/deployToRun.yaml`.

Note the Service Account details. Here are mine:
- PROJECT=grantcm
- REGION=us-central1
- CLOUD_RUN_SERVICE_NAME=grantcm
- SA=grantcm-sa@grantcm.iam.gserviceaccount.com

You'll need to add some permissions to the Service Account to not get errors. See https://stackoverflow.com/q/62783869:

```
gcloud run services add-iam-policy-binding $CLOUD_RUN_SERVICE_NAME \
  --member=serviceAccount:$SA \
  --role=roles/run.admin \
  --project=$PROJECT

gcloud iam service-accounts add-iam-policy-binding $SA \
  --member=serviceAccount:$SA \
  --role roles/iam.serviceAccountUser \
  --project=$PROJECT

gcloud projects add-iam-policy-binding grantcm \
--member "serviceAccount:grantcm-sa@grantcm.iam.gserviceaccount.com" \
--role "roles/owner"
```

If all worked well, every time you push to `master`, the website will be deployed to Cloud Run.
