import express from "express";
import { lockController} from "../controllers/lockController";

const router = express.Router();

router.post("/lock", lockController);

export default router;
