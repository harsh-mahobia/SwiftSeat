import { Request, Response } from "express";
import { Booking } from "../models/Bookings";
import { Bus } from "../models/Bus";
import { v4 as uuidv4 } from "uuid";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { busId, seats, passengers, totalPrice } = req.body;

    console.log(seats);
    if (!busId || !seats || !passengers || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if trip exists
    const trip = await Bus.findById(busId);
    if (!trip) return res.status(404).json({ message: "Bus not found" });


    // Generate booking ID
    const bookingId = uuidv4();

    // Save booking
    const booking = new Booking({
      busId,
      seats,
      passengers,
      totalPrice,
      bookingId,
      bookedAt: new Date(),
    });

    await booking.save();

    // Update trip with booked seats
    trip.seatsBooked.push(...seats.map((s: number) => ({ number: s, available : false })));
    await trip.save()

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

