import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        _id: string
        role: string
        username: string
        email: string
    }
    interface Session {
        user: User
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id: string
        role: string
        username: string
        email: string
    }
}