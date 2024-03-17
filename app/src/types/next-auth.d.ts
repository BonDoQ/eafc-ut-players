import { DUser, DUserMetaData } from '@/lib/directus';
import NextAuth, { DefaultSession } from 'next-auth';

interface User extends DUser {
  metadata: DUserMetaData;
}
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    refreshToken: string;

    user: User;
  }
}
