import credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
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
    async jwt({ token, user, account, profile }) {
      // Initial sign in
      if (account && user) {
        if (account.provider === "google") {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASEURL}/auth/google-login`,
              {
                email: profile?.email || user.email,
                name: profile?.name || user.name,
                picture: profile?.picture || user.image,
                googleId: profile?.sub,
              }
            );

            const savedUser = response.data?.data;

            return {
              ...token,
              _id: savedUser._id,
              role: savedUser.role,
              email: savedUser.email,
              token: response.data.token,
            };
          } catch (error) {
            console.error("Error saving Google user to DB:", error);
            return token;
          }
        }

        // Handle credentials provider
        if (account.provider === "credentials") {
          return {
            ...token,
            _id: user._id,
            role: user.role,
            email: user.email,
            token: user.token,
          };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard-redirect`;
    },
  },

  pages: {
    signIn: "/login",
    error: "/not-found",
  },
});
