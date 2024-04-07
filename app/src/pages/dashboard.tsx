import { loadConfigs } from '@/lib/get-configs';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

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
      <Head>
        <title>EAFC 24 - Dashboard</title>
      </Head>

      <div className="container mt-6">

        <div className="row">
          <div className="col-12 col-lg-8 mx-auto">
            <h3 className="display-5">API token</h3>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 offset-lg-2 col-lg-2">
            Authenticated as
          </div>
          <div className="col-12 col-lg-6">
            <div className='mt-1 mt-lg-0'><code className="bg-info-subtle text-info px-2 py-1 rounded-pill">{fullname}</code></div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 offset-lg-2 col-lg-2">
            API token
          </div>
          <div className="col-12 col-lg-6">
            <div className='mt-1 mt-lg-0 d-flex gap-1 align-items-center'>
              <code className="border border-success-subtle bg-success-subtle text-success px-2 py-1 rounded-pill">{userApiToken}</code>
              <a href="#" className="btn btn-sm" onClick={(e) => {
                navigator.clipboard.writeText(userApiToken!);
              }}>Copy</a>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 offset-lg-2 col-lg-2">
            API calls
          </div>
          <div className="col-12 col-lg-6">
            <div className='mt-1 mt-lg-0'><code className="bg-warning-subtle text-warning px-2 py-1 rounded-pill">{userApiLimit} / {totalApiLimit}</code></div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  const { apiLimit } = await loadConfigs();

  return { props: { totalApiLimit: apiLimit } };
}
