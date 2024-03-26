import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/navbar';
import Meta from '@/components/meta';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const bootstrap = 'bootstrap/dist/js/bootstrap';
  useEffect(() => {
    import('bootstrap');
  }, []);

  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Meta title="EAFC 24 - " description="API for FC ultimate team 2024" />
      <Navbar />
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-X6TT55NYB4" />
    </SessionProvider>
  );
}

import '@/styles/main.scss';
import { GoogleAnalytics } from '@next/third-parties/google';
import Head from 'next/head';
import { useEffect } from 'react';
