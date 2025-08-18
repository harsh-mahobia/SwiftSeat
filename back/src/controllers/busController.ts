import { Request, Response } from "express";
import { Bus } from "../models/Bus";
import { asyncHandler } from "../middleware/ErrorHandler";
import { Booking } from "../models/Bookings";
import { SeatLock } from "../models/SeatLock";

// GET /api/buses
export const getBuses = asyncHandler(async (req: Request, res: Response) => {
  const { departureCity, arrivalCity, page = 1, pageSize = 10, date } = req.query;

  if (!departureCity || !arrivalCity) {
    const error: any = new Error("departureCity and arrivalCity are required");
    error.statusCode = 400;
    throw error;
  }

  const toStrArray = (param: unknown): string[] => {
    if (!param) return [];
    if (Array.isArray(param)) return param.map(String);
    return param.toString().split(",").map((s) => s.trim()).filter(Boolean);
  };

  const seatArray = req.body.seatTypes ? toStrArray(req.body.seatTypes) : [];
  const acArray = req.body.acTypes ? toStrArray(req.body.acTypes) : [];
  const timeArray = req.body.times ? toStrArray(req.body.times) : [];

  // 🔑 Use regex for case-insensitive matching
  const query: any = {
    $and: [
      { stops: { $elemMatch: { city: { $regex: `^${departureCity}$`, $options: "i" } } } },
      { stops: { $elemMatch: { city: { $regex: `^${arrivalCity}$`, $options: "i" } } } },
    ],
  };

  if (seatArray.length > 0) query.seatType = { $in: seatArray };
  if (acArray.length > 0) {
    query.ac = { $in: acArray.map((t) => t.toUpperCase() === "AC") };
  }
  if (timeArray.length > 0) {
    query.slot = { $in: timeArray.map((t) => t.toLowerCase()) };
  }

  if (date) {
    const startDate = date.toString();
  
    query.tripDate = { $gte: startDate };
  }

  // console.log("Final Query: ", JSON.stringify(query, null, 2));
  let buses = await Bus.find(query);


  buses = buses.filter((bus) => {
    const cities = bus.stops.map((s) => s.city.toLowerCase());
    return cities.indexOf(departureCity.toString().toLowerCase()) <
           cities.indexOf(arrivalCity.toString().toLowerCase());
  });
  

  const totalPage = Math.ceil(buses.length / Number(pageSize));
  buses = buses.slice(Number(pageSize) * (Number(page) - 1), Number(page) * Number(pageSize));

  res.json({
    success: true,
    totalPage,
    totalBuses: buses.length,
    currentPage: page,
    buses,
  });
});


// GET /api/buses/:busId
export const getBusById = asyncHandler(async (req: Request, res: Response) => {
  const { busId } = req.params;

  if (!busId) {
    const error: any = new Error("busId is required");
    error.statusCode = 400;
    throw error;
  }

  let bus = await Bus.findById(busId);
  if (!bus) {
    const error: any = new Error("Bus not found");
    error.statusCode = 404;
    throw error;
  }

  const now = new Date();

  // Find expired locks
  const expiredLocks = await SeatLock.find({
    busId,
    expiresAt: { $lte: now },
  });

  if (expiredLocks.length > 0) {
    const unlockedSeats: number[] = [];
    const justRemovedFromLocks: number[] = [];

    for (const lock of expiredLocks) {
      for (const seat of lock.seatNumber) {
        const isBooked = await Booking.exists({
          busId,
          seats: { $in: [seat] },
        });

        if (isBooked) {
          justRemovedFromLocks.push(seat); // booked → only remove from lock
        } else {
          bus.seatsBooked = bus.seatsBooked.filter((s: any) => s.number !== seat); // not booked → free seat
          unlockedSeats.push(seat);
        }
      }
    }

    await Promise.all([
      bus.save(),
      SeatLock.deleteMany({ _id: { $in: expiredLocks.map((lock) => lock._id) } }),
    ]);

    // console.log("Expired locks cleaned", { unlockedSeats, justRemovedFromLocks });
  }

  return res.status(200).json({
    success: true,
    bus,
  });
});
