import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

const DEMO_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@orahweb.com",
    passwordHash: bcrypt.hashSync("password123", 10),
    role: "admin",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@orahweb.com",
    passwordHash: bcrypt.hashSync("password123", 10),
    role: "user",
  },
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@orahweb.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = DEMO_USERS.find((u) => u.email === credentials.email);
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role ?? "user";
      session.user.id = token.sub ?? "";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
