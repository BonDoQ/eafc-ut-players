import AuthForm from '@/components/AuthForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Data {
  email?: string;
  password?: string;
}

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const handleFormSubmit = async (data: Data) => {
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (!response?.error) {
      router.push('/dashboard');
    } else {
      response.status === 401 ? setError('Your email or password is incorrect') : null;
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <AuthForm title="Login" onSubmit={handleFormSubmit} buttonText="Login" isFullForm={false} />
    </>
  );
}

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
