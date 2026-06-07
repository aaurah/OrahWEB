import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

if (process.env.NODE_ENV === "production" && !process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET environment variable must be set in production");
}

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

// Hash computed once at startup asynchronously — avoids blocking the event loop.
// All demo users share the same password for convenience.
const _demoPasswordHashP = bcrypt.hash("password123", 10);

const DEMO_USERS = [
  { id: "1", name: "Admin User", email: "admin@orahweb.com", role: "admin" },
  { id: "2", name: "Jane Doe",   email: "jane@orahweb.com",  role: "user"  },
] as const;

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

        const hash = await _demoPasswordHashP;
        const isValid = await bcrypt.compare(credentials.password, hash);
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
  // Stable dev fallback keeps sessions alive across restarts in development.
  // In production the env var is required (enforced above).
  secret: process.env.NEXTAUTH_SECRET ?? "orahweb-dev-secret-change-in-production",
};
