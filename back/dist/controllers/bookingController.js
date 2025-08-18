"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = void 0;
const Bookings_1 = require("../models/Bookings");
const Bus_1 = require("../models/Bus");
const uuid_1 = require("uuid");
const createBooking = async (req, res) => {
    try {
        const { busId, seats, passengers, totalPrice } = req.body;
        if (!busId || !seats || !Array.isArray(seats) || seats.length === 0 || !passengers || !totalPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const bus = await Bus_1.Bus.findById(busId);
        if (!bus)
            return res.status(404).json({ message: "Bus not found" });
        const unavailableSeats = seats.filter((seatNum) => bus.seatsBooked.some((s) => s.number === seatNum && s.available === false));
        if (unavailableSeats.length > 0) {
            return res.status(400).json({
                message: "Some seats are already booked",
                unavailableSeats,
            });
        }
        const bookingId = (0, uuid_1.v4)();
        const booking = new Bookings_1.Booking({
            busId,
            seats,
            passengers,
            totalPrice,
            bookingId,
            bookedAt: new Date(),
        });
        await booking.save();
        // Update bus seats availability
        seats.forEach((seatNum) => {
            const seatIndex = bus.seatsBooked.findIndex((s) => s.number === seatNum);
            if (seatIndex >= 0) {
                bus.seatsBooked[seatIndex].available = false; // mark existing seat unavailable
            }
            else {
                bus.seatsBooked.push({ number: seatNum, available: false }); // add new entry
            }
        });
        await bus.save();
        res.status(201).json({
            message: "Booking successful",
            booking,
        });
    }
    catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.createBooking = createBooking;
