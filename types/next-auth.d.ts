import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            uid: string | null,
            username?: string | null,
        } & DefaultSession["user"]
    }
}