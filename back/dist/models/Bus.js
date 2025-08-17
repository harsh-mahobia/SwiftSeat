"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
const mongoose_1 = require("mongoose");
const StopSchema = new mongoose_1.Schema({
    city: { type: String, required: true, trim: true },
    time: { type: String, required: true },
    date: { type: Date, required: true }
}, { _id: false });
const SeatSchema = new mongoose_1.Schema({
    number: { type: Number, required: true },
    available: { type: Boolean, default: true },
}, { _id: false });
const BusSchema = new mongoose_1.Schema({
    number: { type: String, required: true, unique: true },
    slot: {
        type: String,
        enum: ["morning", "afternoon", "evening", "night"],
        required: true,
    },
    ac: { type: Boolean, required: true },
    seatType: {
        type: String,
        enum: ["seater", "sleeper", "semi-sleeper"],
        required: true,
    },
    tripDate: { type: Date, required: true },
    name: { type: String, required: true },
    stops: { type: [StopSchema], required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    seatsBooked: { type: [SeatSchema], default: [] },
}, { timestamps: true, collection: 'Bus' });
exports.Bus = (0, mongoose_1.model)("Bus", BusSchema);
