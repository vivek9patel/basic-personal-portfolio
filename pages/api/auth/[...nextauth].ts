import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'V9 Credentials',
      credentials: {
        username: { label: 'TempUsername', type: 'text', placeholder: 'v9p' },
        password: { label: 'TempPassword', type: 'password' },
      },
      // @ts-ignore
      async authorize() {
        return { id: '1', name: 'Visitor', email: 'visitor@vivek9patel.com' };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // @ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
