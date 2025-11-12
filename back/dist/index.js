"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const bus_1 = __importDefault(require("./routes/bus"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const lock_1 = __importDefault(require("./routes/lock"));
const health_1 = __importDefault(require("./routes/health"));
const ErrorHandler_1 = require("./middleware/ErrorHandler");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// DB Connection
(0, db_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        name: "SwiftSeat API",
        version: "1.3.0",
        description: "Backend API for bus search, booking, and seat management between Raipur, Bangalore, and Hyderabad.",
        backendRoutes: {
            "Bus Search & Details (/api/buses)": {
                "POST /api/buses": {
                    description: "Search for buses between supported cities with filters.",
                    requiredFields: ["departureCity", "arrivalCity", "date"],
                    optionalFields: [
                        "seatTypes ['seater', 'semi-sleeper', 'sleeper']",
                        "acTypes ['AC', 'NON-AC']",
                        "times ['Morning', 'Afternoon', 'Evening', 'Night']",
                        "page",
                        "pageSize",
                    ],
                    response: {
                        success: true,
                        totalPage: "number",
                        totalBuses: "number",
                        currentPage: "number",
                        buses: "Array<Bus>",
                    },
                },
                "GET /api/buses/:busId": {
                    description: "Fetch detailed info for a specific bus.",
                    params: ["busId"],
                    response: "Detailed bus info including stops, seat availability, pricing.",
                },
            },
            "Bookings Management (/api/bookings)": {
                "POST /api/bookings": {
                    description: "Create a new booking for selected seats.",
                    requiredFields: [
                        "busId",
                        "seats[]",
                        "passengers[{name, age, gender}]",
                        "totalPrice",
                    ],
                    response: {
                        message: "Booking successful",
                        booking: "BookingDetails",
                    },
                },
            },
            "Seat Management (/api/seats)": {
                "POST /api/seats/lock": {
                    description: "Temporarily lock selected seats during the booking process.",
                    requiredFields: ["busId", "seats[]"],
                    response: "Confirmation of seats being locked.",
                },
            },
        },
        availableRoutes: [
            "Raipur ↔️ Bangalore",
            "Raipur ↔️ Hyderabad",
            "Bangalore ↔️ Hyderabad",
        ],
        frontendRoutes: {
            "/": "Home/Search page",
            "/buses": "Search results and available buses",
            "/bus/:id": "Bus details and seat selection",
            "/payment": "Payment and passenger details",
            "/booking-success": "Booking confirmation page",
            "*": "404 Not Found page",
        },
        keyFeatures: {
            "Search Functionality": [
                "City-to-city search",
                "Multiple filters (AC/Non-AC, seat type, time)",
                "Pagination support",
            ],
            "Booking System": [
                "Interactive seat selection",
                "Seat locking during booking",
                "Passenger management",
                "Booking confirmation",
            ],
            "Bus Details": [
                "Comprehensive bus information",
                "Real-time seat availability",
                "Pricing details",
                "Route stops info",
            ],
        },
        technicalNotes: [
            "All endpoints return appropriate HTTP status codes",
            "Error handling implemented across all routes",
            "CORS enabled for cross-origin requests",
            "City validation enforced for all route searches",
        ],
        frontendURL: "https://swift-seat-mu.vercel.app",
    });
});
app.use("/", health_1.default);
app.use("/api/buses", bus_1.default);
app.use("/api/bookings", bookings_1.default);
app.use("/api/seats", lock_1.default);
app.use(ErrorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
