import credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // }),
    credentials({
      name: "Credentials",
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await response.json();
        // If no error and we have user data, return it
        if (response.ok && user?.data) {
          return {
            _id: user.data._id,
            role: user.data.role,
            email: user.data.email,
            token: user.token,
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    jwt({ token, user }) {
      if (user) {
        token._id = user._id as string;
        token.role = user.role as string;
        token.email = user.email as string;
        token.role = user.role as string;
        token.token = user.token as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.token = token.token;
      session.user._id = token._id;
      session.user.role = token.role;
      session.user.token = token.token;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/not-found",
  },
});
