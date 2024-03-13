import type { AppProps } from "next/app";

import Navbar from "@/components/navbar";
import Meta from "@/components/meta";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta
        title="FUT Api 24"
        description="API for FC ultimate team 2024"
      />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

import '@/styles/main.scss';