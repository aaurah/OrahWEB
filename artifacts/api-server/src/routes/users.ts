import { Router, type Request, type Response, type NextFunction } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { asc, eq } from "drizzle-orm";

const router = Router();

function requireApiKey(req: Request, res: Response, next: NextFunction): void {
  const expected = process.env["INTERNAL_API_KEY"];
  if (!expected) {
    next();
    return;
  }
  if (req.headers["authorization"] !== `Bearer ${expected}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/users", async (_req, res, next) => {
  try {
    const users = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        role: usersTable.role,
        verified: usersTable.verified,
        banned: usersTable.banned,
        lastLoginAt: usersTable.lastLoginAt,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .orderBy(asc(usersTable.createdAt));

    res.json({ users, total: users.length });
  } catch (err) {
    next(err);
  }
});

router.patch("/users/:id", requireApiKey, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, banned } = req.body as { role?: string; banned?: boolean };

    const patch: Partial<typeof usersTable.$inferInsert> = {};
    if (role === "admin" || role === "user") patch.role = role;
    if (typeof banned === "boolean") patch.banned = banned;

    if (Object.keys(patch).length === 0) {
      res.status(400).json({ error: "Nothing to update" });
      return;
    }

    const [updated] = await db
      .update(usersTable)
      .set(patch)
      .where(eq(usersTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ user: updated });
  } catch (err) {
    next(err);
  }
});

export default router;
