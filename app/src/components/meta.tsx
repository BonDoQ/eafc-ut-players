import { FC } from 'react';
import { NextSeo } from 'next-seo';

interface Props {
  title: string;
  description?: string;
}

const Meta: FC<Props> = ({ title, description }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title: title,
        description: description,
        images: [{ url: '/og.png' }],
      }}
    />
  );
};

export default Meta;
