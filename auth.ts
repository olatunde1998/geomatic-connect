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
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASEURL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );

          const user = await response.json();

          if (response.ok && user?.data) {
            return {
              _id: user.data._id,
              role: user.data.role,
              email: user.data.email,
              token: user.token,
            };
          }
          throw new Error(user.message || "Authentication failed");
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3600, //1hour
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      const prodBaseUrl = process.env.NEXTAUTH_URL || baseUrl;
      return url.startsWith(prodBaseUrl) ? url : prodBaseUrl;
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
      session.user.token = token.token as string;
      session.user._id = token._id as string;
      session.user.role = token.role as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login?error=Configuration",
  },
});
