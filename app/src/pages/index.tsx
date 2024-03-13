import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">

            <div className="bg-secondary-subtle p-5 rounded-4">
              <h1 className="display-5 fw-bold text-body-emphasis text-center">
                FUT Api
                <div className="text-secondary">
                  for FC Ultimate Team 24
                </div>
              </h1>
              <div className="d-flex mt-4 gap-3 justify-content-center">
                <Link href="/register" className="btn btn-lg btn-primary shadow">Create an account</Link>
                <a href="#" className="btn btn-lg btn-primary-subtle">API documentation</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}