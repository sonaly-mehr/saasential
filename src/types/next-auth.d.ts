import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      profileImage?: string | null;
    } & DefaultSession["user"];
  }
}