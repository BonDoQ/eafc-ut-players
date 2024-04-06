import { DefaultSeoProps } from 'next-seo';

const title = 'EAFC-DB';
const description =
  'Unleash the Power of EAFC Data with seamless API integration, and access to all player data, prices, more for your bots, applications, or tools.';
const canonical = 'https://eafcdb.app/';
const keywords =
  'EAFC, FUT, Ultimate Team, FIFA, EA Sports, API, Database, Prices, Players, Stats, FUTBIN, FUTWIZ, FUTHEAD, FUTDB';
const logo = 'https://eafcdb.app/images/logo.png';

export const SEO: DefaultSeoProps = {
  title,
  description,
  canonical,
  additionalLinkTags: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  additionalMetaTags: [
    {
      property: 'keywords',
      content: keywords,
    },
  ],

  openGraph: {
    title: title,
    description,
    locale: 'en_US',
    type: 'website',
    url: canonical,
    siteName: title,
    images: [
      {
        url: logo,
        alt: title,
      },
    ],
  },
};
