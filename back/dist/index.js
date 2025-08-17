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
    res.send("Hello World");
});
app.use("/api/buses", bus_1.default);
app.use("/api/bookings", bookings_1.default);
// Error Handler (MUST be last)
app.use(ErrorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
