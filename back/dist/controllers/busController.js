"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusById = exports.getBuses = void 0;
const Bus_1 = require("../models/Bus");
const ErrorHandler_1 = require("../middleware/ErrorHandler");
//GET /api/buses
exports.getBuses = (0, ErrorHandler_1.asyncHandler)(async (req, res) => {
    const { departureCity, arrivalCity, date, page = 1, pageSize = 10 } = req.query;
    // console.log(seatTypes, typeof acTypes, times)
    if (!departureCity || !arrivalCity) {
        res.status(400);
        throw new Error("departureCity and arrivalCity are required");
    }
    const toStrArray = (param) => {
        if (!param)
            return [];
        if (Array.isArray(param))
            return param.map(String);
        return param.toString().split(",").map((s) => s.trim()).filter(Boolean);
    };
    const seatArray = req.body.seatTypes !== undefined ? toStrArray(req.body.seatTypes) : [];
    const acArray = req.body.acTypes !== undefined ? toStrArray(req.body.acTypes) : [];
    const timeArray = req.body.times !== undefined ? toStrArray(req.body.times) : [];
    const query = {
        $and: [
            { stops: { $elemMatch: { city: departureCity.toString() } } },
            { stops: { $elemMatch: { city: arrivalCity.toString() } } },
        ],
    };
    // // ✅ Date filter (fix)
    // if (date) {
    //   const tripDate = new Date(date.toString());
    //   const startOfDay = new Date(tripDate);
    //   startOfDay.setHours(0, 0, 0, 0);
    //   const endOfDay = new Date(tripDate);
    //   endOfDay.setHours(23, 59, 59, 999);
    //   query.tripDate = { $gte: date.toString() };
    // }
    if (seatArray.length > 0) {
        query.seatType = { $in: seatArray };
    }
    if (acArray.length > 0) {
        query.ac = { $in: acArray.map((t) => (t.toUpperCase() === "AC" ? true : false)) };
    }
    if (timeArray.length > 0) {
        query.slot = { $in: timeArray.map((t) => t.toLowerCase()) };
    }
    let buses = await Bus_1.Bus.find(query);
    buses = buses.filter((bus) => {
        const cities = bus.stops.map((s) => s.city);
        return cities.indexOf(departureCity.toString()) < cities.indexOf(arrivalCity.toString());
    });
    let totalPage = Math.ceil(buses.length / Number(pageSize));
    buses = buses.slice(Number(pageSize) * (Number(page) - 1), Number(page) * Number(pageSize));
    res.json({
        success: true,
        totalPage: totalPage,
        totalBuses: buses.length,
        currentPage: page,
        buses
    });
});
// GET /api/buses/:busId
exports.getBusById = (0, ErrorHandler_1.asyncHandler)(async (req, res) => {
    const bus = await Bus_1.Bus.findById(req.params.busId);
    if (!bus) {
        res.status(404);
        throw new Error("Bus not found");
    }
    res.json({ success: true, bus });
});
