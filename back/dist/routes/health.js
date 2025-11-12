"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
exports.default = router;
