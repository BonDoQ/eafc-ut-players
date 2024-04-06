import type { AppProps } from 'next/app';
import Image from 'next/image';
import { SessionProvider } from 'next-auth/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { DefaultSeo } from 'next-seo';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ball from '/public/ball.png';
import { SEO } from '@/seo';
import '@/styles/main.scss';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <DefaultSeo {...SEO} />
      <Navbar />
      <div className="circle"></div>
      <Image className="ball" src={ball} width={240} height={240} alt={'Adidas ball'} placeholder="blur" />
      <div className="main">
        <Component {...pageProps} />
      </div>
      <GoogleAnalytics gaId="G-X6TT55NYB4" />
      <Footer />
    </SessionProvider>
  );
}
