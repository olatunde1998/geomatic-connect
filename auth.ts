import Google from "next-auth/providers/google"
// import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials";
// import { connectDB } from "@/utils/database";
import User from "@/models/user";
import { connectDB } from "./utils/database";




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
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
          token._id = user._id as string;
          token.role = user.role as string;
          token.username = user.username as string;

      }
      if (trigger === "update" && session) {
          token = { ...token, ...session };
      }
      return token;
  },
    async session({ session, token }) {
      const sessionUser = await User.findOne({email: session.user.email as string})
      console.log(sessionUser, "this is sessionUser here")
      session.user._id = token._id ,
      session.user.role = token.role;
      session.user.name = token.username;
      return session;
  },
  async signIn({profile}: any){
    console.log(profile)
    try{
      await connectDB()
      const userExist = await User.findOne({email: profile.email as string})
      if(!userExist){
        const user = await User.create({
          googleId: profile.id,
          email: profile.email,
          username: profile.displayName,
          thumbnail: profile.picture,
          password: "",
        })
        console.log(user, "this is user here =====")
      }
      return true;
    } catch(error){
      console.log(error)
      return false
    }
  }
  },
 
  pages: {
    signIn: "/login",
    error: '/not-found',
  },
})

export const config = {
  runtime: "nodejs",
};