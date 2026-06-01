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

// ─── Domains ────────────────────────────────────────────────────────────────

export async function initDomainsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orahweb_domains (
      id            SERIAL PRIMARY KEY,
      user_id       INTEGER REFERENCES orahweb_users(id) ON DELETE SET NULL,
      session_id    TEXT UNIQUE,
      domain_name   TEXT NOT NULL,
      tld           TEXT NOT NULL,
      type          TEXT NOT NULL DEFAULT 'traditional',
      status        TEXT NOT NULL DEFAULT 'active',
      customer_email TEXT,
      purchased_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at    TIMESTAMPTZ
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orahweb_dns_records (
      id          SERIAL PRIMARY KEY,
      domain_id   INTEGER NOT NULL REFERENCES orahweb_domains(id) ON DELETE CASCADE,
      record_type TEXT NOT NULL,
      name        TEXT NOT NULL,
      value       TEXT NOT NULL,
      ttl         INTEGER NOT NULL DEFAULT 3600,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

const WEB3_TLDS = new Set([
  "crypto","web3","nft","dao","wallet","bitcoin","eth","blockchain",
  "x","888","zil","coin","token","defi","meta","metaverse",
]);

function detectDomainType(tld: string): string {
  return WEB3_TLDS.has(tld.toLowerCase()) ? "web3" : "traditional";
}

export async function saveDomainPurchase(
  sessionId: string,
  domains: string[],
  customerEmail: string | null,
  userId: number | null
) {
  await initDomainsTable();
  const saved = [];
  for (const domain of domains) {
    const parts = domain.split(".");
    const tld = parts[parts.length - 1];
    const type = detectDomainType(tld);
    const expiresAt = type === "traditional"
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      : null;

    try {
      const result = await pool.query(
        `INSERT INTO orahweb_domains
           (session_id, domain_name, tld, type, status, customer_email, user_id, expires_at)
         VALUES ($1, $2, $3, $4, 'active', $5, $6, $7)
         ON CONFLICT (session_id) DO NOTHING
         RETURNING *`,
        [sessionId + "_" + domain, domain, tld, type, customerEmail, userId, expiresAt]
      );
      if (result.rows[0]) {
        await pool.query(
          `INSERT INTO orahweb_dns_records (domain_id, record_type, name, value, ttl)
           VALUES ($1,'NS','@','ns1.orahweb.com',86400),
                  ($1,'NS','@','ns2.orahweb.com',86400)`,
          [result.rows[0].id]
        );
        saved.push(result.rows[0]);
      }
    } catch {
      // Skip duplicates
    }
  }
  return saved;
}

export async function getUserDomains(userId: number) {
  await initDomainsTable();
  const result = await pool.query(
    `SELECT d.*,
            COALESCE(
              TO_CHAR(d.expires_at, 'Mon DD, YYYY'),
              'Never'
            ) AS expires_label,
            (SELECT COUNT(*) FROM orahweb_dns_records r WHERE r.domain_id = d.id) AS dns_count
     FROM orahweb_domains d
     WHERE d.user_id = $1
     ORDER BY d.purchased_at DESC`,
    [userId]
  );
  return result.rows;
}

export async function getDomainByName(domainName: string, userId: number) {
  await initDomainsTable();
  const result = await pool.query(
    `SELECT * FROM orahweb_domains WHERE domain_name = $1 AND user_id = $2`,
    [domainName, userId]
  );
  return result.rows[0] ?? null;
}

export async function getDnsRecords(domainId: number) {
  const result = await pool.query(
    `SELECT * FROM orahweb_dns_records WHERE domain_id = $1 ORDER BY record_type, name`,
    [domainId]
  );
  return result.rows;
}

export async function addDnsRecord(
  domainId: number,
  recordType: string,
  name: string,
  value: string,
  ttl: number
) {
  const result = await pool.query(
    `INSERT INTO orahweb_dns_records (domain_id, record_type, name, value, ttl)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [domainId, recordType.toUpperCase(), name || "@", value, ttl]
  );
  return result.rows[0];
}

export async function deleteDnsRecord(recordId: number, domainId: number) {
  await pool.query(
    `DELETE FROM orahweb_dns_records WHERE id = $1 AND domain_id = $2`,
    [recordId, domainId]
  );
}

// ─── Auth Code / EPP ─────────────────────────────────────────────────────────

export async function ensureAuthCodeColumn() {
  await pool.query(`
    ALTER TABLE orahweb_domains
    ADD COLUMN IF NOT EXISTS auth_code TEXT;
  `).catch(() => {});
}

export async function getOrCreateAuthCode(domainId: number): Promise<string> {
  await ensureAuthCodeColumn();
  const existing = await pool.query(
    `SELECT auth_code FROM orahweb_domains WHERE id = $1`,
    [domainId]
  );
  if (existing.rows[0]?.auth_code) return existing.rows[0].auth_code;
  const code = Array.from({ length: 16 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"[
      Math.floor(Math.random() * 56)
    ]
  ).join("");
  await pool.query(
    `UPDATE orahweb_domains SET auth_code = $1 WHERE id = $2`,
    [code, domainId]
  );
  return code;
}

export async function regenerateAuthCode(domainId: number): Promise<string> {
  await ensureAuthCodeColumn();
  const code = Array.from({ length: 16 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"[
      Math.floor(Math.random() * 56)
    ]
  ).join("");
  await pool.query(
    `UPDATE orahweb_domains SET auth_code = $1 WHERE id = $2`,
    [code, domainId]
  );
  return code;
}

// ─── Blockchain Crypto Records ────────────────────────────────────────────────

export async function initBlockchainTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orahweb_crypto_records (
      id          SERIAL PRIMARY KEY,
      domain_id   INTEGER NOT NULL REFERENCES orahweb_domains(id) ON DELETE CASCADE,
      coin        TEXT NOT NULL,
      network     TEXT NOT NULL DEFAULT 'mainnet',
      address     TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export async function getCryptoRecords(domainId: number) {
  await initBlockchainTable();
  const result = await pool.query(
    `SELECT * FROM orahweb_crypto_records WHERE domain_id = $1 ORDER BY coin`,
    [domainId]
  );
  return result.rows;
}

export async function addCryptoRecord(
  domainId: number, coin: string, network: string, address: string
) {
  await initBlockchainTable();
  await pool.query(
    `DELETE FROM orahweb_crypto_records WHERE domain_id = $1 AND coin = $2 AND network = $3`,
    [domainId, coin.toUpperCase(), network]
  );
  const result = await pool.query(
    `INSERT INTO orahweb_crypto_records (domain_id, coin, network, address)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [domainId, coin.toUpperCase(), network, address.trim()]
  );
  return result.rows[0];
}

export async function deleteCryptoRecord(recordId: number, domainId: number) {
  await pool.query(
    `DELETE FROM orahweb_crypto_records WHERE id = $1 AND domain_id = $2`,
    [recordId, domainId]
  );
}

// ─── IPFS / Content Hash ──────────────────────────────────────────────────────

export async function ensureIpfsColumn() {
  await pool.query(`
    ALTER TABLE orahweb_domains
    ADD COLUMN IF NOT EXISTS ipfs_hash TEXT;
  `).catch(() => {});
}

export async function setIpfsHash(domainId: number, hash: string | null) {
  await ensureIpfsColumn();
  await pool.query(
    `UPDATE orahweb_domains SET ipfs_hash = $1 WHERE id = $2`,
    [hash || null, domainId]
  );
}

// ─── Transfers ───────────────────────────────────────────────────────────────

export async function initTransfersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orahweb_transfers (
      id            SERIAL PRIMARY KEY,
      user_id       INTEGER REFERENCES orahweb_users(id) ON DELETE SET NULL,
      domain_name   TEXT NOT NULL,
      direction     TEXT NOT NULL,
      auth_code     TEXT,
      status        TEXT NOT NULL DEFAULT 'pending',
      customer_email TEXT,
      notes         TEXT,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export async function createTransfer(
  userId: number | null,
  domainName: string,
  direction: string,
  authCode: string | null,
  email: string | null
) {
  await initTransfersTable();
  const result = await pool.query(
    `INSERT INTO orahweb_transfers (user_id, domain_name, direction, auth_code, customer_email)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, domainName.toLowerCase().trim(), direction, authCode, email]
  );
  return result.rows[0];
}

export async function getUserTransfers(userId: number) {
  await initTransfersTable();
  const result = await pool.query(
    `SELECT * FROM orahweb_transfers WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
}

export async function renewDomain(domainId: number, userId: number) {
  const result = await pool.query(
    `UPDATE orahweb_domains
     SET expires_at = expires_at + INTERVAL '1 year'
     WHERE id = $1 AND user_id = $2
     RETURNING expires_at`,
    [domainId, userId]
  );
  return result.rows[0];
}

export default pool;
