import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { getSpeedInsightsStatus } from "../middlewares/speedInsights.js";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.get("/healthz/speed-insights", (_req, res) => {
  res.json(getSpeedInsightsStatus());
});

export default router;
