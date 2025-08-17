// src/routes/busRoutes.ts
import express from "express";
import { getBuses, getBusById } from "../controllers/busController";
import { Request, Response } from "express";
import { Bus } from "../models/Bus";

const router = express.Router();

// router.get("/", async (req: Request, res: Response) => {
//     try {
//       const data = await Bus.find(); // fetch all documents
//       res.status(200).json({
//         success: true,
//         count: data.length,
//         data,
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).json({
//         success: false,
//         message: "Server error while fetching data",
//         error: error instanceof Error ? error.message : String(error),
//       });
//     }
//   });
router.post("/", getBuses);       // GET /api/buses
router.get("/:busId", getBusById); // GET /api/buses/:busId

export default router;
