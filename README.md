# grant.cm

The website [grant.cm](http://grant.cm)

### Quickstart

```sh
npm run compile
npm start
open http://localhost:3000
```

### Scripts

Develop the site with these scripts:

#### Develop

- `npm run compile`: Compiles the TypeScript
- `npm run watch`: Watches and compiles TypeScript
- `npm run swatch`: Watches and compiles CSS
- `npm start`: Start the website

#### Lint / Test

- `npm run lint`: Lints this repository
- `npm run fix`: Fixes all lint issues

#### Deploy

- `npm run deploy`: Deploys the website

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

```
A – DOMAIN from Cloud Run – generated IPv4
A – DOMAIN from Cloud Run – generated IPv4
A – DOMAIN from Cloud Run – generated IPv4
A – DOMAIN from Cloud Run – generated IPv4
AAAA – DOMAIN from Cloud Run – generated IPv6
AAAA – DOMAIN from Cloud Run – generated IPv6
AAAA – DOMAIN from Cloud Run – generated IPv6
AAAA – DOMAIN from Cloud Run – generated IPv6
CNAME – www – DOMAIN (redirect www.DOMAIN to DOMAIN)
TXT – DOMAIN – google-site-verification=ZkBjUhfP1hRIEVOXKhEJz3xaQnRPx_8NUxxy9mFX9x0
```

All of these should **Not be Proxied**.

### Domain mappings

Create the domain mapping:

```
gcloud beta run domain-mappings create --service grantcm --domain grant.cm
```

Describe the mapping to verify it works:

```
gcloud beta run domain-mappings describe --domain grant.cm
```

It may take up to 24 hours for it to work. If the Run domain mapping is spinning, try deleting it and creating it again.