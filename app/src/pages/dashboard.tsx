import { getConfigs } from '@/lib/directus';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';

type Props = {
  totalApiLimit: number;
};

export default function Dashboard({ totalApiLimit }: Props) {
  const { data } = useSession();

  const userApiToken = data?.user?.metadata?.api_token;
  const userApiLimit = data?.user?.metadata?.api_limit;
  const fullname = data?.user?.metadata.full_name;

  return (
    <>
      <NextSeo title="Dashboard" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="bg-secondary-subtle p-5">
              <h3 className="display-5">Welcome, {fullname}!</h3>

              <div className="mt-4">
                <p>
                  API token <code className="bg-success-subtle text-success px-2 py-1">{userApiToken}</code>
                </p>
                <p>
                  API calls{' '}
                  <code className="bg-warning-subtle text-warning px-2 py-1">
                    {userApiLimit} / {totalApiLimit}
                  </code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  const { apiLimit } = await getConfigs();

  return { props: { totalApiLimit: apiLimit } };
}
