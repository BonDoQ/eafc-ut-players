import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data } = useSession();
  const isUser = !!data?.user;
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="bg-secondary-subtle p-5 rounded-4">
              <h1 className="display-5 fw-bold text-body-emphasis text-center">
                EAFC API
                <div className="text-secondary">for Ultimate Team 24</div>
              </h1>
              <div className="d-flex mt-4 gap-3 justify-content-center">
                {isUser ? (
                  <Link href="/dashboard" className="btn btn-lg btn-primary shadow">
                    Go to dashboard
                  </Link>
                ) : (
                  <Link href="/register" className="btn btn-lg btn-primary shadow">
                    Create an account
                  </Link>
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
