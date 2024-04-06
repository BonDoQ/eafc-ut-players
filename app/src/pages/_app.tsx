import type { AppProps } from 'next/app';
import Image from 'next/image';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { GoogleAnalytics } from '@next/third-parties/google';

import Navbar from '@/components/navbar';
import Meta from '@/components/meta';
import Footer from '@/components/footer';

import ball from '/public/ball.png';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

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
      <div className="circle"></div>
      <Image className="ball" src={ball} width={240} height={240} alt={'Adidas ball'} placeholder='blur' />
      <div className="main">
        <Component {...pageProps} />
      </div>
      <GoogleAnalytics gaId="G-X6TT55NYB4" />
      <Footer />
    </SessionProvider>
  );
}

import '@/styles/main.scss';