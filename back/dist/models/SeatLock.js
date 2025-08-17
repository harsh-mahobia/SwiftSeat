"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatLock = void 0;
// src/models/SeatLock.ts
const mongoose_1 = require("mongoose");
const SeatLockSchema = new mongoose_1.Schema({
    busId: { type: String, required: true },
    seatNumber: { type: Number, required: true },
    lockedBy: { type: String, required: true },
    lockedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
}, { timestamps: true, collection: "SeatLock" });
exports.SeatLock = (0, mongoose_1.model)("SeatLock", SeatLockSchema);
