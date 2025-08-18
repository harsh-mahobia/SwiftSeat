"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lockController_1 = require("../controllers/lockController");
const router = express_1.default.Router();
router.post("/lock", lockController_1.lockController);
exports.default = router;
