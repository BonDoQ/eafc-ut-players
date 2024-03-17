import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions, Session } from 'next-auth';
import { directus, DUserMetaData } from '@/lib/directus';
import {
  AuthenticationData,
  createDirectus,
  login,
  readItem,
  readItems,
  readMe,
  refresh,
  rest,
  withToken,
} from '@directus/sdk';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';

interface ICredentials {
  email: string;
  password: string;
}

interface IAuth {
  access_token: string;
  refresh_token: string;
}

interface IUser {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  metadata: {
    id: string;
    user_id: string | null;
    api_limit: number | null;
    api_token: string | null;
  };
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async function (credentials) {
        try {
          const { email, password } = credentials as ICredentials;
          const api = directus();
          const auth = await api.request(login(email, password));

          return auth as any;
        } catch (e: any) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user: any; account: any }) {
      if (account && user) {
        const apiAuth = directus(user.access_token);
        const userData = await apiAuth.request(readMe({ fields: ['id', 'first_name', 'last_name', 'email'] }));
        const userMetaData = await apiAuth.request(
          readItems('user_metadata', {
            filter: { user_id: { _eq: userData.id } },
            fields: ['id', 'user_id', 'api_limit', 'api_token'],
            limit: 1,
          }),
        );

        return {
          ...token,
          accessToken: user.access_token,
          refreshToken: user.refresh_token,
          user: {
            ...userData,
            metadata: userMetaData[0],
          },
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(options);
