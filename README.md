# grant.cm

The website [grant.cm](http://grant.cm)

Built with:
- Node
- Typescript
- React / Next.js
- SCSS

Deployed with:
- Google Cloud Buildpacks
- Cloud Run

### Quickstart

```sh
cd frontend
npm i
npm run dev
open http://localhost:8080
```

### Scripts

Develop the site with these scripts:

#### Develop

- `npm run dev`: Dev mode. Compiles JSX, TypeScript, SCSS.
- `npm start`: Start the website

#### Lint / Test

- `npm run lint`: Lints this repository
- `npm run fix`: Fixes all lint issues
- `npm run clean`: Cleans any built files

#### Build & Deploy

- `npm run build`: Builds the website for production.
- `npm run deploy`: Deploys the website to Google Cloud

#### DNS

This website is hosted on Cloud Run.

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
gcloud beta run domain-mappings create \
--service grantcm \
--region us-central1 \
--domain grant.cm
```

Describe the mapping to verify it works:

```sh
gcloud beta run domain-mappings describe \
--region us-central1 \
--domain grant.cm
# Prints DNS records that should be the same as above
```

> Note: It may take up to 24 hours for it to work. If the Run domain mapping is spinning, try deleting it and creating it again.
