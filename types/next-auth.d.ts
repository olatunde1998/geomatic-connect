import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    _id: string;
    role: string;
    email: string;
    token: string;
    picture?: string;
    sub?: string;
  }
  interface Session {
    user: {
      _id: string;
      role: string;
      email: string;
      token: string;
      picture?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    role: string;
    email: string;
    token: string;
    picture: string;
  }
}
