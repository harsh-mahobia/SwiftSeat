// src/models/Booking.ts
import { Schema, model, Document } from "mongoose";

interface Passenger {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
}

export interface BookingDocument extends Document {
  busId: string;
  seats: number[];
  passengers: Passenger[];
  totalPrice: number;
  bookingId: string;
  bookedAt: Date;
}

const PassengerSchema = new Schema<Passenger>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
});

const BookingSchema = new Schema<BookingDocument>(
  {
    busId: { type: String, required: true },
    seats: [{ type: Number, required: true }],
    passengers: { type: [PassengerSchema], required: true },
    totalPrice: { type: Number, required: true },
    bookingId: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: "Booking" }
);

export const Booking = model<BookingDocument>("Booking", BookingSchema);
