import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/navbar';
import Meta from '@/components/meta';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Meta title="EAFC 24 - " description="API for FC ultimate team 2024" />
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

import '@/styles/main.scss';
