// src/pages/BookingHistory.tsx
import React, { useEffect, useState } from "react";
import api from "../config/axios";

interface JourneyEntry {
  bookingId: string;
  tripId: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  seats: string[];
  status?: string;
}

const BookingHistory: React.FC = () => {
  const [history, setHistory] = useState<JourneyEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data.journeys?.history || []);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading booking history...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Booking History</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {history.length === 0 ? (
          <p className="p-4 text-gray-500">No booking history available.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase tracking-wider">
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Destination</th>
                <th className="py-3 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 border-b">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {booking.from} to {booking.to}
                  </td>
                  <td
                    className={`py-3 px-4 border-b font-semibold 
                      ${booking.status === "confirmed" ? "text-green-600" :
                        booking.status === "cancelled" ? "text-red-600" : "text-blue-600"}`}
                  >
                    {booking.status || "Completed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
