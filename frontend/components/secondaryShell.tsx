import Head from 'next/head';
import Link from 'next/link';
import Layout from './layout';

const navigation = [
  {href: '/consulting', label: 'Consulting'},
  {href: '/videos', label: 'Videos'},
  {href: '/resume', label: 'Resume'},
  {href: '/cal', label: 'Calendar'},
];

export default function SecondaryShell({
  title,
  children,
  fullBleed = false,
}: {
  title: string;
  children: React.ReactNode;
  fullBleed?: boolean;
}) {
  return (
    <Layout>
      <Head>
        <title>{title} | Grant Timmerman</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-paper text-ink">
        <header className="border-b border-muted bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 max-[700px]:items-start">
            <Link
              href="/"
              className="font-montserrat text-small font-bold uppercase tracking-[2px]"
            >
              Grant Timmerman
            </Link>
            <nav aria-label="Primary">
              <ul className="flex flex-wrap justify-end gap-x-5 gap-y-2 text-small">
                {navigation.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-primary-dark"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main
          className={
            fullBleed
              ? 'min-h-[calc(100vh-158px)] flex-1'
              : 'mx-auto w-full max-w-6xl flex-1 px-6 py-10'
          }
        >
          <h1 className={fullBleed ? 'sr-only' : 'mb-8 text-xlarge font-bold'}>
            {title}
          </h1>
          {children}
        </main>
        <footer className="border-t border-muted bg-white px-6 py-5 text-center text-small text-gray">
          <Link href="/">Home</Link>
          <span aria-hidden="true"> · </span>
          <a href="mailto:granttimmerman@gmail.com">Contact</a>
        </footer>
      </div>
    </Layout>
  );
}
