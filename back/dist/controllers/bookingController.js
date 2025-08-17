"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = void 0;
const Bookings_1 = require("../models/Bookings");
const Bus_1 = require("../models/Bus");
const uuid_1 = require("uuid");
const createBooking = async (req, res) => {
    try {
        const { busId, seats, passengers, totalPrice } = req.body;
        console.log(seats);
        if (!busId || !seats || !passengers || !totalPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Check if trip exists
        const trip = await Bus_1.Bus.findById(busId);
        if (!trip)
            return res.status(404).json({ message: "Bus not found" });
        // Generate booking ID
        const bookingId = (0, uuid_1.v4)();
        // Save booking
        const booking = new Bookings_1.Booking({
            busId,
            seats,
            passengers,
            totalPrice,
            bookingId,
            bookedAt: new Date(),
        });
        await booking.save();
        // Update trip with booked seats
        trip.seatsBooked.push(...seats.map((s) => ({ number: s, available: false })));
        await trip.save();
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
