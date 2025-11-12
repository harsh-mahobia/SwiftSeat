import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import busRoutes from "./routes/bus";
import bookingRoutes from "./routes/bookings";
import lockRoutes from './routes/lock'
import healthRoutes from './routes/health'
import { errorHandler } from "./middleware/ErrorHandler";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

// DB Connection
connectDB();

app.use(cors({
    origin: "*",
}))
// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    name: "SwiftSeat API",
    version: "1.3.0",
    description:
      "Backend API for bus search, booking, and seat management between Raipur, Bangalore, and Hyderabad.",
    backendRoutes: {
      "Bus Search & Details (/api/buses)": {
        "POST /api/buses": {
          description:
            "Search for buses between supported cities with filters.",
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
          description:
            "Temporarily lock selected seats during the booking process.",
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
app.use("/", healthRoutes)
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/seats", lockRoutes )



app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
