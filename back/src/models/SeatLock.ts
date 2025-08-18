// src/models/SeatLock.ts
import { Schema, model, Document } from "mongoose";

export interface SeatLockDocument extends Document {
  busId: string;
  seatNumber: number[];
  lockedAt: Date;
  expiresAt: Date;
}

const SeatLockSchema = new Schema<SeatLockDocument>(
  {
    busId: { type: String, required: true },
    seatNumber: { type: [Number], required: true },
    lockedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true, collection : "SeatLock" }
);

export const SeatLock = model<SeatLockDocument>("SeatLock", SeatLockSchema);
