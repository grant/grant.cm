import Head from 'next/head';
import Script from 'next/script';

export const siteTitle = 'Grant Timmerman';
export const siteDescription =
  'Grant Timmerman is a full-stack software engineer and open source ' +
  'enthusiast building real-time voice AI at Cartesia.';
const siteUrl = 'https://grant.cm';
const siteImage = `${siteUrl}/og.png`;

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="w-full h-full">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Grant Timmerman" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImage} />
        <meta name="twitter:image:alt" content="Grant Timmerman" />
      </Head>
      <GoogleAnalytics />
      {/* <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header> */}
      {/* <main></main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )} */}
      {children}
    </div>
  );
}

function GoogleAnalytics() {
  // Set NEXT_PUBLIC_GA_ID to your GA4 Measurement ID (e.g. "G-XXXXXXXXXX")
  // to enable analytics. Analytics are disabled when it is not set.
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) {
    return null;
  }
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
