import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import { getConfigs, upsertDirectusUserAccount } from '@/lib/directus';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      const dConfig = await getConfigs();
      const dAccount = await upsertDirectusUserAccount({
        email: user?.email || token?.email,
        google_account_id: user?.id || token?.sub,
        full_name: user?.name || token?.name,
        google_img: user?.image || token?.picture,
        api_limit: dConfig.apiLimit,
      });

      return {
        ...token,
        dAccount,
      };
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user.metadata = token.dAccount;
      return session;
    },
  },
};

export default NextAuth(options);
