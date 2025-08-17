import api from "../config/axios";

export interface Trip {
  _id: string;
  busId: string;
  route: {
    from: { city: string; station: string };
    to: { city: string; station: string };
  };
  date: string;
  departureTime: string;
  arrivalTime: string;
  availableSeats: string[];
  price: { base: number; currency: string };
  status: string;
}

/**
 * Fetch trips from backend.
 * Optional: filter by fromCity and toCity
 */
export const listTrips = async (
  from?: string,
  to?: string,
  date?: string
): Promise<Trip[]> => {
  const params: Record<string, string> = {};

  if (from) params.from = from;
  if (to) params.to = to;
  if (date) params.date = date; // only add if present

  const res = await api.get("/bookings/trips", { params });
  return res.data;
};

export const getTripById = async (tripId: string): Promise<Trip> => {
  const { data } = await api.get(`/trips/${tripId}`);
  return data;
};

// Always returns the freshest seats from server
// Always returns the freshest seats from server
export const getTripSeats = async (tripId: string): Promise<{ availableSeats: string[] }> => {
  if (!tripId) {
    throw new Error("Trip ID is required to fetch seats.");
  }

  const { data } = await api.get(`/trips/${tripId}/seats`);
  return data; // { availableSeats }
};
