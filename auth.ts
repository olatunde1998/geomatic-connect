import credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"
import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github";
import User from "@/models/user";
import { connectDB } from "@/utils/database";





export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
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
            return user.data;
          }
          // Return null if user data could not be retrieved
          return null;
        },
      }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        // Connect to the database
        await connectDB();
        
        // Check if user already exists in the database
        let dbUser = await User.findOne({ email: profile.email });

        if (!dbUser) {
          // If the user doesn't exist, create a new user
          dbUser = await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,  // Store Google profile picture
            // Add any other user data you want to store
          });
        }

        // Store user info in JWT token
        token._id = dbUser._id;
        token.email = dbUser.email;
        token.name = dbUser.name;
        token.role = dbUser.role;  // Assuming role is part of your schema
      }

      return token;
    },

    async session({ session, token }) {
      session.user._id = token._id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role; // Pass role if necessary
      return session;
    },
  },
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl;
  //   },
  //   jwt({ token, user, trigger, session }) {
  //     if (user) {
  //         token._id = user._id as string;
  //         token.role = user.role as string;
  //         token.username = user.username as string;

  //     }
  //     if (trigger === "update" && session) {
  //         token = { ...token, ...session };
  //     }
  //     return token;
  // },
  //   async session({ session, token }) {
  //     // const sessionUser = await User.findOne({email: session.user.email as string})
  //     // console.log(sessionUser, "this is sessionUser here")
  //     session.user._id = token._id ,
  //     session.user.role = token.role;
  //     session.user.name = token.username;
  //     return session;
  // },

  // },
 
  pages: {
    signIn: "/login",
    error: '/not-found',
  },
})
