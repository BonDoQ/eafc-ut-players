import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const { data } = useSession();
  const isUser = !!data?.user;
  return (
    <>
      <Head>
        <title>EAFC 24 - Home</title>
      </Head>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="bg-secondary-subtle p-5 rounded-4">
              <h1 className="display-5 fw-bold text-body-emphasis text-center">
                Welcome to EAFC!
                <div className="text-secondary">Your Ultimate Team API</div>
              </h1>
              <div className="text-secondary text-center">
                Unleash the Power of EAFC Data with seamless API integration, and access to all player data, prices,
                more for your bots, applications, or tools.
              </div>
              <div className="d-flex mt-4 gap-3 justify-content-center">
                {isUser ? (
                  <Link href="/dashboard" className="btn btn-lg btn-primary shadow">
                    Go to dashboard
                  </Link>
                ) : (
                  <button className="btn btn-lg btn-primary shadow" onClick={() => signIn('google')}>
                    Login with Google
                  </button>
                )}
                <Link href="/docs" className="btn btn-lg btn-primary-subtle">
                  API documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
