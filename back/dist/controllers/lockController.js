"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockController = void 0;
const Bus_1 = require("../models/Bus");
const SeatLock_1 = require("../models/SeatLock");
const ErrorHandler_1 = require("../middleware/ErrorHandler");
exports.lockController = (0, ErrorHandler_1.asyncHandler)(async (req, res) => {
    const { seats, busId } = req.body;
    if (!busId || !Array.isArray(seats) || seats.length === 0) {
        const error = new Error("busId and seats are required");
        error.statusCode = 400;
        throw error;
    }
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
    const bus = await Bus_1.Bus.findById(busId);
    if (!bus) {
        const error = new Error("Bus not found");
        error.statusCode = 404;
        throw error;
    }
    const alreadyBooked = seats.some((seat) => bus.seatsBooked.some((b) => b.number === seat && !b.available));
    if (alreadyBooked) {
        const error = new Error("One or more seats are already locked/booked");
        error.statusCode = 409;
        throw error;
    }
    const seatLock = new SeatLock_1.SeatLock({
        busId: busId,
        seatNumber: seats.map((seat) => seat),
        expiresAt: expiresAt,
    });
    bus.seatsBooked.push(...seats.map((seat) => ({ number: seat, available: true })));
    await Promise.all([bus.save(), seatLock.save()]);
    return res.status(200).json({
        success: true,
        message: "Seats locked successfully",
        seats,
        expiresAt,
    });
});
