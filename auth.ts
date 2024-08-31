import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth"
// import credentials from "next-auth/providers/credentials";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    // credentials({
    //     name: "Credentials",
    //     async authorize(credentials) {
    //       const response = await fetch(
    //         `${process.env.NEXT_PUBLIC_BASEURL}/users/login`,
    //         {
    //           method: "POST",
    //           body: JSON.stringify(credentials),
    //           headers: { "Content-Type": "application/json" },
    //         }
    //       );
    //       const user = await response.json();
    //       // If no error and we have user data, return it
    //       if (response.ok && user) {
    //         return user;
    //       }
    //       // Return null if user data could not be retrieved
    //       return null;
    //     },
    //   }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      console.log(session, "session is here ===== pls check==")
      // session.user.id = token.id
      return session
    },
  },
 
  pages: {
    signIn: "/login",
    error: '/not-found',
  },
})