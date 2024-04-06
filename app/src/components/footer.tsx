import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="container mt-7 mb-3">
      <div className="row">
        <div className="col-12">
          <Image src="/images/logo.png" alt="logo" width="80" height="80" className="mx-auto d-block mb-3" />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" href="/docs">
                Documentation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/terms-and-conditions">
                Terms and Conditions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="mailto:info@eafcdb.app">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
