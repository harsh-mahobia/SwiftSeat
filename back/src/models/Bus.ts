import { Schema, Document, model } from "mongoose";


interface Stop {
  city: string; 
  time: string;
  date : Date
}

interface SeatBooked {
  number: number;
  available: boolean;
}

export interface IBus extends Document {
  slot: "morning" | "afternoon" | "evening" | "night"; 
  ac: boolean;
  seatType: "seater" | "sleeper" | "semi-sleeper"; 
  number: string; 
  name: string;
  tripDate : Date;
  stops: Stop[];
  price: number; 
  capacity: number;
  seatsBooked: SeatBooked[];
}


const StopSchema = new Schema<Stop>(
  {
    city: { type: String, required: true, trim: true },
    time: { type: String, required: true }, 
    date : {type : Date, required : true }
  },
  { _id: false }
);

const SeatSchema = new Schema<SeatBooked>(
  {
    number: { type: Number, required: true },
    available: { type: Boolean, default: true },
  },
  { _id: false }
);

const BusSchema = new Schema<IBus>(
  {
    number: { type: String, required: true, unique: true },
    slot: {
      type: String,
      enum: ["morning", "afternoon", "evening", "night"],
      required: true,
    },
    ac: { type: Boolean, required: true },
    seatType: {
      type: String,
      enum: ["seater", "sleeper", "semi-sleeper"],
      required: true,
    },
    tripDate: { type: Date, required: true },
    name: { type: String, required: true },
    stops: { type: [StopSchema], required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true},
    seatsBooked: { type: [SeatSchema], default: [] },
  },
  { timestamps: true, collection : 'Bus' }
);

export const Bus = model<IBus>("Bus", BusSchema);

