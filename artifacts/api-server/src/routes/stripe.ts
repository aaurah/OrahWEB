import { Router, type IRouter } from 'express';
import { getUncachableStripeClient } from '../stripeClient.js';

const router: IRouter = Router();

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

export default router;
