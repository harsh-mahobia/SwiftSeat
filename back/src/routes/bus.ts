// src/routes/busRoutes.ts
import express from "express";
import { getBuses, getBusById } from "../controllers/busController";

const router = express.Router();


router.post("/", getBuses);       // GET /api/buses
router.get("/:busId", getBusById); // GET /api/buses/:busId

export default router;
