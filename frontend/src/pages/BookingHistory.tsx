import React from "react";

const BookingHistory: React.FC = () => {
  const bookings = [
    { id: 1, date: "2025-08-10", destination: "Delhi to Mumbai", status: "Confirmed" },
    { id: 2, date: "2025-07-28", destination: "Pune to Bangalore", status: "Cancelled" },
    { id: 3, date: "2025-07-15", destination: "Chennai to Hyderabad", status: "Completed" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Booking History</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase tracking-wider">
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Destination</th>
              <th className="py-3 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 border-b">{booking.date}</td>
                <td className="py-3 px-4 border-b">{booking.destination}</td>
                <td className={`py-3 px-4 border-b font-semibold 
                  ${booking.status === "Confirmed" ? "text-green-600" : 
                    booking.status === "Cancelled" ? "text-red-600" : "text-blue-600"}`}>
                  {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingHistory;
