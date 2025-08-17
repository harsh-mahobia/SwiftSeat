import { Request, Response } from "express";
import { Bus } from "../models/Bus";
import { asyncHandler } from "../middleware/ErrorHandler";



export const getBuses = asyncHandler(async (req: Request, res: Response) => {
  const { departureCity, arrivalCity, date, page = 1, pageSize = 10, seatTypes, acTypes, times } = req.query;

  if (!departureCity || !arrivalCity) {
    res.status(400);
    throw new Error("departureCity and arrivalCity are required");
  }

  const pageNum = Number(page) || 1;
  const size = Number(pageSize) || 10;
  const skip = (pageNum - 1) * size;

  // Utility: normalize into string[]
  const toStrArray = (param: unknown): string[] => {
    if (!param) return [];
    if (Array.isArray(param)) return param.map(String);
    return param.toString().split(",").map((s) => s.trim()).filter(Boolean);
  };

  const seatArray = toStrArray(seatTypes);
  const acArray = toStrArray(acTypes);
  const timeArray = toStrArray(times);

  // Base query (must include both cities in stops)
  const query: any = {
    $and: [
      { stops: { $elemMatch: { city: departureCity.toString() } } },
      { stops: { $elemMatch: { city: arrivalCity.toString() } } },
    ],
  };

  // // ✅ Date filter (fix)
  if (date) {
    const tripDate = new Date(date.toString());
    const startOfDay = new Date(tripDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(tripDate);
    endOfDay.setHours(23, 59, 59, 999);

    query.tripDate = { $gte: date.toString() };
  }

  if (seatArray.length > 0) {
    query.seatType = { $in: seatArray };
  }

  // if (acArray.length > 0) {
  //   query.ac = { $in: acArray.map((t) => (t.toUpperCase() === "AC" ? true : false)) };
  // }

  if (timeArray.length > 0) {
    query.slot = { $in: timeArray.map((t) => t.toLowerCase()) };
  }

  const totalCount = await Bus.countDocuments(query);
  let buses = await Bus.find(query).skip(skip).limit(size);

  // Ensure departure comes before arrival in stops order
  buses = buses.filter((bus) => {
    const cities = bus.stops.map((s) => s.city);
    return cities.indexOf(departureCity.toString()) < cities.indexOf(arrivalCity.toString());
  });

  console.log(buses);

  res.json({
    success: true,
    page: pageNum,
    pageSize: size,
    totalPages: Math.ceil(totalCount / size),
    totalBuses: totalCount,
    buses,
  });
});





// GET /api/buses/:busId
export const getBusById = asyncHandler(async (req: Request, res: Response) => {
  const bus = await Bus.findById(req.params.busId);
  if (!bus) {
    res.status(404);
    throw new Error("Bus not found");
  }
  res.json({ success: true, bus });
});
