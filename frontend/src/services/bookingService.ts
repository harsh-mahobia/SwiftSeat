// src/services/bookingService.ts
import api from "../config/axios";

export interface CreateBookingPayload {
  tripId: string;
  seats: string[];
}

export const createBooking = async (payload: CreateBookingPayload) => {
  const { data } = await api.post("/bookings", payload);
  return data; // { message, booking }
};
export const bookSeat = async (tripId: string, seat: string) => {
  const res = await api.post(`/bookings/book-seat`, { tripId, seat });
  return res.data;
};