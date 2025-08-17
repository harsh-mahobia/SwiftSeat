// src/routes/bookingRoutes.ts
import express from "express";
import { createBooking } from "../controllers/bookingController";

const router = express.Router();

router.post("/", createBooking); // POST /api/bookings

export default router;
