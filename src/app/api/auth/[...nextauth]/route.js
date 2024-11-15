import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

// Define the authOptions with proper typing
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        // Fetch user from the database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        return { id: user.id.toString(), email: user.email };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
      session.user = {
        ...(session.user || {}),
        id: token.id,
        email: token.email,
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
};

// Export GET and POST handlers for NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };