import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Dummy credentials/authorization
export const authOptions = {
  providers: [
    CredentialsProvider({
        name: 'V9 Credentials',
        credentials: {
          username: { label: "TempUsername", type: "text", placeholder: "v9p" },
          password: { label: "TempPassword", type: "password" }
        },
        // @ts-ignore
        async authorize(credentials, req) {
            return { id: 1, name: 'Visitor', email: 'visitor@vivek9patel.com' }
        }
      })
  ],
}

export default NextAuth(authOptions)