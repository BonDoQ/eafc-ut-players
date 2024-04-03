import Link from 'next/link';
import { FormEvent, useState } from 'react';

interface Data {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (data: Data) => void;
  isFullForm?: boolean;
}

export default function AuthForm({ title, buttonText, onSubmit, isFullForm = true }: AuthFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-lg-6 mx-auto">
          <h2>Create an account</h2>
          <form onSubmit={handleFormSubmit} className="d-flex flex-column gap-3 border p-2 mb-2 p-4 shadow">
            <h1>{title}</h1>
            {isFullForm && (
              <>
                <div>
                  <label className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div>
              <label className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                name="password"
                value={formData.password}
                className="form-control"
                required
                onChange={handleInputChange}
              />
            </div>

            <input type="submit" className="btn btn-primary mt-4" value={buttonText} />
            {isFullForm ? (
              <p>
                Already have an account? <Link href="/login">Login</Link>
              </p>
            ) : (
              <div>
                <p>
                  New here? <Link href="/register">Create an account</Link>
                </p>
                <p>
                  <Link href="/request-reset-password">Forgot password?</Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
