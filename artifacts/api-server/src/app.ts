import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes/index.js";
import { WebhookHandlers } from "./webhookHandlers.js";
import { logger } from "./lib/logger";
import { injectSpeedInsights } from "./middlewares/speedInsights.js";
import { injectWebAnalytics } from "./middlewares/webAnalytics.js";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// Stripe webhook MUST be registered before express.json() so body stays a Buffer
app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['stripe-signature'];
    if (!signature) return res.status(400).json({ error: 'Missing stripe-signature' });
    try {
      const sig = Array.isArray(signature) ? signature[0] : signature;
      await WebhookHandlers.processWebhook(req.body as Buffer, sig);
      res.status(200).json({ received: true });
    } catch (error: any) {
      console.error('Webhook error:', error.message);
      res.status(400).json({ error: 'Webhook processing error' });
    }
  }
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vercel Speed Insights - injects tracking script into HTML responses
// Note: This API server primarily returns JSON. Speed Insights will only
// track metrics if/when HTML pages are served.
app.use(injectSpeedInsights());

// Vercel Web Analytics - injects tracking script into HTML responses
// Note: This API server primarily returns JSON. Web Analytics will only
// track page views if/when HTML pages are served.
app.use(injectWebAnalytics());

app.use("/api", router);

export default app;
