import { Router, type IRouter } from 'express';
import { getUncachableStripeClient } from '../stripeClient.js';
import pg from 'pg';

const router: IRouter = Router();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
});

const WEB3_TLDS = new Set([
  'crypto','web3','nft','dao','wallet','bitcoin','eth','blockchain',
  'x','888','zil','coin','token','defi','meta','metaverse',
]);

async function saveDomains(
  sessionId: string,
  domains: string[],
  customerEmail: string | null,
  userId: number | null
) {
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
    )
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
    )
  `);

  const saved = [];
  for (const domain of domains) {
    const parts = domain.split('.');
    const tld = parts[parts.length - 1];
    const type = WEB3_TLDS.has(tld.toLowerCase()) ? 'web3' : 'traditional';
    const expiresAt = type === 'traditional'
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      : null;
    try {
      const result = await pool.query(
        `INSERT INTO orahweb_domains
           (session_id, domain_name, tld, type, status, customer_email, user_id, expires_at)
         VALUES ($1, $2, $3, $4, 'active', $5, $6, $7)
         ON CONFLICT (session_id) DO UPDATE
           SET customer_email = EXCLUDED.customer_email,
               user_id = COALESCE(orahweb_domains.user_id, EXCLUDED.user_id)
         RETURNING *`,
        [sessionId + '_' + domain, domain, tld, type, customerEmail, userId, expiresAt]
      );
      if (result.rows[0]) {
        const existing = await pool.query(
          'SELECT id FROM orahweb_dns_records WHERE domain_id = $1 LIMIT 1',
          [result.rows[0].id]
        );
        if (existing.rowCount === 0) {
          await pool.query(
            `INSERT INTO orahweb_dns_records (domain_id, record_type, name, value, ttl)
             VALUES ($1,'NS','@','ns1.orahweb.com',86400),
                    ($1,'NS','@','ns2.orahweb.com',86400)`,
            [result.rows[0].id]
          );
        }
        saved.push(result.rows[0]);
      }
    } catch (e) {
      console.error('saveDomains error for', domain, e);
    }
  }
  return saved;
}

router.post('/stripe/checkout', async (req, res) => {
  try {
    const { items } = req.body as { items: { domain: string; price: number }[] };

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const stripe = await getUncachableStripeClient();
    const origin = req.headers.origin || `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      submit_type: 'pay',
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: `${item.domain} — Domain Registration`,
            description: `One-time domain registration · Powered by OrahWeb`,
            images: [],
            metadata: { domain: item.domain, provider: 'OrahWeb' },
          },
        },
        quantity: 1,
      })),
      custom_text: {
        submit: { message: 'Your domain will be registered instantly upon payment.' },
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/domains`,
      metadata: {
        domains: items.map((i) => i.domain).join(','),
        platform: 'OrahWeb',
      },
    });

    res.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err.message);
    res.status(500).json({ error: err.message || 'Checkout failed' });
  }
});

router.get('/stripe/session/:sessionId', async (req, res) => {
  try {
    const stripe = await getUncachableStripeClient();
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId, {
      expand: ['line_items'],
    });
    res.json({
      status: session.payment_status,
      customer_email: session.customer_details?.email,
      domains: session.metadata?.domains?.split(',') ?? [],
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/stripe/checkout/complete', async (req, res) => {
  try {
    const { sessionId, userId } = req.body as { sessionId?: string; userId?: number | null };
    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId' });
    }

    const stripe = await getUncachableStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not confirmed' });
    }

    const domains = session.metadata?.domains?.split(',') ?? [];
    const customerEmail = session.customer_details?.email ?? null;

    await saveDomains(sessionId, domains, customerEmail, userId ?? null);

    return res.json({
      domains,
      customer_email: customerEmail,
      status: session.payment_status,
    });
  } catch (err: any) {
    console.error('Checkout complete error:', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
});

export default router;
