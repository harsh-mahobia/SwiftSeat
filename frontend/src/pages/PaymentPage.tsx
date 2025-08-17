import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Stop {
  city: string;
  time: string;
  date: string;
}

interface Bus {
  _id: string;
  slot: "morning" | "afternoon" | "evening" | "night";
  ac: boolean;
  seatType: "seater" | "sleeper" | "semi-sleeper";
  number: string;
  name: string;
  tripDate: string;
  stops: Stop[];
  price: number;
  capacity: number;
}

interface Passenger {
  name: string;
  age: string;
  gender: string;
}

const PaymentPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const bus: Bus = state?.bus;
  const selectedSeats: number[] = state?.selectedSeats || [];
  const totalPrice: number = state?.totalPrice || 0;

  const [passengers, setPassengers] = useState<Passenger[]>(
    selectedSeats.map(() => ({ name: "", age: "", gender: "" }))
  );

  const [loading, setLoading] = useState(false);

  const handleInputChange = (index: number, field: keyof Passenger, value: string) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);

      // Prepare payload in backend format
      const payload = {
        busId: bus._id,
        seats: selectedSeats,
        passengers: passengers.map((p) => ({
          name: p.name,
          age: Number(p.age),
          gender: p.gender.toLowerCase() as "male" | "female" | "other",
        })),
        totalPrice,
      };

      const res = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const data = await res.json();
      console.log("Booking successful:", data);

      // Redirect to success page (send bookingId in state)
      navigate("/booking-success", { state: data });


    } catch (err: any) {
      console.error("Error during booking:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid gap-6">
      {/* Bus Details & Summary */}
      <div className="col-span-1 flex flex-col gap-6">
        {/* Bus Details */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Bus Details</h3>
          <p className="font-semibold">{bus?.name}</p>
          <p className="text-gray-600">{bus?.ac ? "AC" : "Non-AC"} {bus?.seatType}</p>
          <p>{bus?.stops[0]?.city} → {bus?.stops[bus?.stops.length - 1]?.city}</p>
          <p>{new Date(bus?.tripDate).toLocaleDateString()}</p>
          <p>{bus?.stops[0]?.time} → {bus?.stops[bus?.stops.length - 1]?.time}</p>
        </div>

        {/* Booking Summary */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
          <p>Selected Seats: {selectedSeats.join(", ")}</p>
          <p className="text-green-600 font-semibold mt-2">Total Price: ₹{totalPrice}</p>
        </div>
      </div>

      {/* Passenger Details */}
      <div className="col-span-2 bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Payment and Booking Confirmation</h2>
        {selectedSeats.map((seat, idx) => (
          <div key={seat} className="mb-6 border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">Passenger {idx + 1}</h3>
            <input
              type="text"
              placeholder="Name"
              value={passengers[idx].name}
              onChange={(e) => handleInputChange(idx, "name", e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="number"
              placeholder="Age"
              value={passengers[idx].age}
              onChange={(e) => handleInputChange(idx, "age", e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />
            <div className="flex gap-4 mb-2">
              <label>
                <input
                  type="radio"
                  name={`gender-${idx}`}
                  value="male"
                  checked={passengers[idx].gender === "male"}
                  onChange={(e) => handleInputChange(idx, "gender", e.target.value)}
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name={`gender-${idx}`}
                  value="female"
                  checked={passengers[idx].gender === "female"}
                  onChange={(e) => handleInputChange(idx, "gender", e.target.value)}
                /> Female
              </label>
              <label>
                <input
                  type="radio"
                  name={`gender-${idx}`}
                  value="other"
                  checked={passengers[idx].gender === "other"}
                  onChange={(e) => handleInputChange(idx, "gender", e.target.value)}
                /> Other
              </label>
            </div>
          </div>
        ))}
        <button
          onClick={handleConfirmBooking}
          disabled={loading}
          className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
