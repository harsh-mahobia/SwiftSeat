import { Request, Response } from "express";
import { Bus } from "../models/Bus";
import { SeatLock } from "../models/SeatLock";
import { asyncHandler } from "../middleware/ErrorHandler";


export const lockController = asyncHandler(async (req: Request, res: Response) => {
  const { seats, busId } = req.body;

  if (!busId || !Array.isArray(seats) || seats.length === 0) {
    const error: any = new Error("busId and seats are required");
    error.statusCode = 400;
    throw error;
  }

  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  const bus = await Bus.findById(busId);
  if (!bus) {
    const error: any = new Error("Bus not found");
    error.statusCode = 404;
    throw error;
  }

  const alreadyBooked = seats.some((seat: number) =>
    bus.seatsBooked.some((b: any) => b.number === seat && !b.available)
  );

  if (alreadyBooked) {
    const error: any = new Error("One or more seats are already locked/booked");
    error.statusCode = 409;
    throw error;
  }

  const seatLock = new SeatLock({
    busId: busId,
    seatNumber: seats.map((seat: number) => seat),
    expiresAt: expiresAt,
  });

  bus.seatsBooked.push(
    ...seats.map((seat: number) => ({ number: seat, available: true }))
  );

  await Promise.all([bus.save(), seatLock.save()]);

  return res.status(200).json({
    success: true,
    message: "Seats locked successfully",
    seats,
    expiresAt,
  });
});
