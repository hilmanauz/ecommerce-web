import { nextAuthSession } from "@/lib";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthSession);
export { handler as GET, handler as POST };
