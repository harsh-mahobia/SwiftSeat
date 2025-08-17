"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
// src/models/Booking.ts
const mongoose_1 = require("mongoose");
const PassengerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
});
const BookingSchema = new mongoose_1.Schema({
    busId: { type: String, required: true },
    seats: [{ type: Number, required: true }],
    passengers: { type: [PassengerSchema], required: true },
    totalPrice: { type: Number, required: true },
    bookingId: { type: String, required: true, unique: true },
}, { timestamps: true, collection: "Booking" });
exports.Booking = (0, mongoose_1.model)("Booking", BookingSchema);
