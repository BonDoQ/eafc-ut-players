import { directus } from '@/lib/directus';
import { createUser } from '@directus/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const ERROR_CODES_TO_RESPONSE: { [key: string]: { message: string; status: number } } = {
  RECORD_NOT_UNIQUE: { status: 409, message: 'A user with this email already exists' },
  FAILED_VALIDATION: { status: 400, message: 'Invalid Email or Password' },
  UNEXPECTED_ERROR: { status: 500, message: 'An unexpected error occurred, please try again' },
};

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    if (request.method !== 'POST') {
      return response.status(405).json({ message: 'Method not allowed' });
    }

    if (!request.body) {
      return response.status(400).json({ message: 'Invalid request' });
    }

    const body = JSON.parse(request.body.toString());
    const { first_name, last_name, email, password } = body;

    const result = await directus().request(
      createUser({
        first_name,
        last_name,
        email,
        password,
        role: process.env.USER_ROLE,
      }),
    );

    return response.status(201).json({ message: 'Account Created!' });
  } catch (e: any) {
    console.log(e);
    const code: string = e.errors?.[0].extensions?.code || 'UNEXPECTED_ERROR';
    const { message = 'An unexpected error occurred, please try again', status = 500 } = ERROR_CODES_TO_RESPONSE[code];

    return response.status(status).json({ message });
  }
}
