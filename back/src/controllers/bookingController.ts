import { Request, Response } from "express";
import { Booking } from "../models/Bookings";
import { Bus } from "../models/Bus";
import { v4 as uuidv4 } from "uuid";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { busId, seats, passengers, totalPrice } = req.body;

    if (!busId || !seats || !Array.isArray(seats) || seats.length === 0 || !passengers || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    const unavailableSeats = seats.filter((seatNum: number) =>
      bus.seatsBooked.some((s: any) => s.number === seatNum && s.available === false)
    );

    if (unavailableSeats.length > 0) {
      return res.status(400).json({
        message: "Some seats are already booked",
        unavailableSeats,
      });
    }

    const bookingId = uuidv4();

    const booking = new Booking({
      busId,
      seats,
      passengers,
      totalPrice,
      bookingId,
      bookedAt: new Date(),
    });

    await booking.save();

    // Update bus seats availability
    seats.forEach((seatNum: number) => {
      const seatIndex = bus.seatsBooked.findIndex((s: any) => s.number === seatNum);
      if (seatIndex >= 0) {
        bus.seatsBooked[seatIndex].available = false; // mark existing seat unavailable
      } else {
        bus.seatsBooked.push({ number: seatNum, available: false }); // add new entry
      }
    });

    await bus.save();

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
