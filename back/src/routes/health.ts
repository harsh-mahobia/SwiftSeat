

import express from "express";
const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

router.get("/metrics", (req, res) => {
  res.json({
    requests_per_minute: 120,
    avg_latency_ms: 230,
    error_rate_percent: 1.2,
  });
});

export default router;
