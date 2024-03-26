import { useState } from 'react';
import AuthForm from '@/components/auth-form';
import { useRouter, redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Head from 'next/head';

interface Data {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export default function RegistrationPage() {
  const [error, setError] = useState('');
  const handleFormSubmit = async (data: Data) => {
    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
      }),
    });
    if (response.status === 201) {
      signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/dashboard',
      });
    } else {
      const { message } = await response.json();
      setError(message);
    }
  };

  return (
    <>
      <Head>
        <title>EAFC 24 - Register</title>
      </Head>

      {error && <p>{error}</p>}
      <AuthForm title="Register here" onSubmit={handleFormSubmit} buttonText="Register" />
    </>
  );
}
