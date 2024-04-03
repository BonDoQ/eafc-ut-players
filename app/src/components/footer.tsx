import Link from "next/link"
import { FC } from "react"


const Footer: FC = () => {
  return (
    <footer className="container mt-6">
      <div className="row">
        <div className="col-12">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="nav-item"><Link className="nav-link" href="/terms-and-conditions">Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer