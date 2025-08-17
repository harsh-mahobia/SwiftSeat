import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import busRoutes from "./routes/bus";
import bookingRoutes from "./routes/bookings";
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
app.get("/", (req, res)=>{
    res.send("Hello World");
})
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);

// Error Handler (MUST be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
