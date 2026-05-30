import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orahweb_users (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role        TEXT NOT NULL DEFAULT 'user',
      verified    BOOLEAN NOT NULL DEFAULT false,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_login  TIMESTAMPTZ
    );
  `);

  const existing = await pool.query(
    "SELECT id FROM orahweb_users WHERE email = $1",
    ["admin@orahweb.com"]
  );
  if (existing.rowCount === 0) {
    const bcrypt = await import("bcryptjs");
    const hash = await bcrypt.hash("OrahAdmin2025!", 10);
    await pool.query(
      `INSERT INTO orahweb_users (name, email, password_hash, role, verified)
       VALUES ($1, $2, $3, $4, $5)`,
      ["Admin", "admin@orahweb.com", hash, "admin", true]
    );
  }
}

export async function findUserByEmail(email: string) {
  await initDb();
  const result = await pool.query(
    "SELECT id, name, email, password_hash, role, verified FROM orahweb_users WHERE email = $1",
    [email.toLowerCase().trim()]
  );
  return result.rows[0] ?? null;
}

export async function createUser(name: string, email: string, passwordHash: string) {
  await initDb();
  const result = await pool.query(
    `INSERT INTO orahweb_users (name, email, password_hash, role, verified)
     VALUES ($1, $2, $3, 'user', false)
     RETURNING id, name, email, role`,
    [name.trim(), email.toLowerCase().trim(), passwordHash]
  );
  return result.rows[0];
}

export async function getAllUsers() {
  await initDb();
  const result = await pool.query(
    `SELECT id, name, email, role, verified,
            TO_CHAR(created_at, 'Mon DD, YYYY') AS joined,
            last_login
     FROM orahweb_users
     ORDER BY created_at ASC`
  );
  return result.rows;
}

export async function updateLastLogin(email: string) {
  await pool.query(
    "UPDATE orahweb_users SET last_login = NOW() WHERE email = $1",
    [email.toLowerCase().trim()]
  );
}

export default pool;
