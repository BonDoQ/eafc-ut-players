import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const { data } = useSession();
  const isUser = !!data?.user;
  const email = data?.user?.email;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="bg-body-tertiary mt-3 rounded-4 shadow-lg">
            <nav className="navbar navbar-expand-lg ps-4 pe-3 py-3">
              <Link className="navbar-brand" href="/">
                FUT Api
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto gap-3">
                  <li className="nav-item">
                    <Link className="nav-link active" href="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Documentation
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Pricing
                    </a>
                  </li>
                  {isUser ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" href="/dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <span className="navbar-text">{email}</span>
                      <li className="nav-item">
                        <button
                          className="btn btn btn-outline-light"
                          onClick={() =>
                            signOut({
                              callbackUrl: '/login',
                            })
                          }
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" href="/login">
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="btn btn-primary" href="/register">
                          Create an account
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
