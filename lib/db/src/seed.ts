import { db } from "./index";
import { usersTable } from "./schema/users";
import { eq, count } from "drizzle-orm";
import bcrypt from "bcryptjs";

const DEMO_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@orahweb.com",
    password: "password123",
    role: "admin",
    verified: true,
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@orahweb.com",
    password: "password123",
    role: "user",
    verified: true,
  },
];

export async function ensureDemoUsers(): Promise<void> {
  const [{ value: existing }] = await db
    .select({ value: count() })
    .from(usersTable);

  if (existing > 0) return;

  for (const u of DEMO_USERS) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await db
      .insert(usersTable)
      .values({
        id: u.id,
        name: u.name,
        email: u.email,
        passwordHash,
        role: u.role,
        verified: u.verified,
        banned: false,
      })
      .onConflictDoNothing();
  }
}
