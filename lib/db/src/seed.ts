import { db } from "./index";
import { usersTable } from "./schema/users";
import { count } from "drizzle-orm";

const DEMO_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@orahweb.com",
    role: "admin" as const,
    verified: true,
    passwordHash: "demo-only",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@orahweb.com",
    role: "user" as const,
    verified: true,
    passwordHash: "demo-only",
  },
];

export async function ensureDemoUsers(): Promise<void> {
  try {
    const [{ value: existing }] = await db
      .select({ value: count() })
      .from(usersTable);

    if (existing > 0) return;

    for (const u of DEMO_USERS) {
      await db
        .insert(usersTable)
        .values({ ...u, banned: false })
        .onConflictDoNothing();
    }
  } catch {
    // DB not ready yet — skip seeding silently
  }
}
