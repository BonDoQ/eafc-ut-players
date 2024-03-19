import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';

const SwaggerUI = dynamic<{
  spec: any;
}>(import('swagger-ui-react') as any, { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div className="swgr-dark">
    <SwaggerUI spec={spec} />
  </div>;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: 'src/pages/api',
    schemaFolders: ['src/lib'],
    definition: {
      openapi: '3.0.0',
      info: {
        title: ' Swagger API Example',
        version: '1.0',
      },
      security: [
        {
          ApiKeyAuth: [],
        },
      ],
      components: {
        securitySchemes: {
          ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'X-AUTH-TOKEN',
          },
        },
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

import 'swagger-ui-react/swagger-ui.css';

export default ApiDoc;