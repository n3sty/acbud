import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            id: string | null,
            email: string | null,
            newUser: boolean,
            name?: string | null,
            userProvider?: string | null,
        } & DefaultSession["user"]
    }
}