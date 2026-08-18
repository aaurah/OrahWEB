import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { getSpeedInsightsStatus } from "../middlewares/speedInsights.js";
import { getWebAnalyticsStatus } from "../middlewares/webAnalytics.js";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.get("/healthz/speed-insights", (_req, res) => {
  res.json(getSpeedInsightsStatus());
});

router.get("/healthz/web-analytics", (_req, res) => {
  res.json(getWebAnalyticsStatus());
});

export default router;
