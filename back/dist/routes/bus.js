"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/busRoutes.ts
const express_1 = __importDefault(require("express"));
const busController_1 = require("../controllers/busController");
const router = express_1.default.Router();
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
router.get("/", busController_1.getBuses); // GET /api/buses
router.get("/:busId", busController_1.getBusById); // GET /api/buses/:busId
exports.default = router;
