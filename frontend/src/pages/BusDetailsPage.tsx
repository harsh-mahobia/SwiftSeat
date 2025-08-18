import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-toastify";


interface Stop {
  city: string;
  time: string;
  date: string;
}

interface SeatBooked {
  number: number;
  available: boolean;
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
  seatsBooked: SeatBooked[];
}

const BusDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  

  const departureCity = state?.departureCity || '';
  const arrivalCity = state?.arrivalCity || '';

  const [bus, setBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const { data } = await api.get(`/api/buses/${id?.toString()}`);
        setBus(data.bus);
      } catch (err) {
        toast.error("Error fetching bus details");
        console.error("Error fetching bus:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBus();
  }, [id]);

  const toggleSeat = (seatNumber: number, available: boolean) => {
    if (!available) {
      toast.warning(`Seat ${seatNumber} is already booked`);
      return;
    }

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((s) => s !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const handleProceedToPayment = async () => {
    if (selectedSeats.length === 0) {
      toast.warning("Please select at least one seat before proceeding");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post(`/api/seats/lock`, { busId: id, seats: selectedSeats });
      toast.success("Seats locked successfully! Proceeding to Details...");
      navigate("/payment", {
        state: { bus, selectedSeats, totalPrice: selectedSeats.length * (bus?.price || 0) },
      });
    } catch (err) {
      toast.error("Unable to lock seats. Please try again.");
      console.log("Error locking seats", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!bus) {
    return <div className="text-center mt-10">Bus not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Bus Details */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">{bus.name}</h2>
        <p className="text-gray-600">{bus.ac ? "AC" : "NON-AC"} {bus.seatType}</p>
        <div className="flex justify-between text-gray-700 mt-2">
          <span>{departureCity} → {arrivalCity}</span>
          <span>{new Date(bus.tripDate).toLocaleDateString()}</span>
        </div>
        <div className="mt-1 text-gray-500">
          Departure: {bus.stops[0].time} | Arrival: {bus.stops[bus.stops.length - 1].time}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="bg-white shadow rounded-lg p-6 mb-6 flex w-full items-center justify-center flex-col">
        <h3 className="text-lg font-semibold mb-4">Select Your Seats</h3>
        <div className="grid grid-cols-4 gap-y-2 max-w-md border-2 border-gray-800 rounded-xl items-center w-72 p-10">
          {Array.from({ length: bus.capacity }, (_, i) => {
            const seatNum = i + 1;
            const seat = bus.seatsBooked.find((s) => s.number === seatNum);
            const available = seat ? false : true;
            const isSelected = selectedSeats.includes(seatNum);

            return (
              <button
                key={seatNum}
                onClick={() => toggleSeat(seatNum, available)}
                className={`w-12 h-12 rounded 
                  ${!available ? "bg-gray-300 cursor-not-allowed" : isSelected ? "bg-blue-400 text-white" : "bg-green-200 hover:bg-green-300"}
                `}
              >
                {seatNum}
              </button>
            );
          })}
        </div>

        <div className="flex gap-4 mt-4 text-sm">
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-green-200 inline-block rounded"></span> Available</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-blue-400 inline-block rounded"></span> Selected</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 bg-gray-300 inline-block rounded"></span> Booked</span>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
        <p className="text-gray-700">
          Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
        </p>
        <p className="text-green-600 font-semibold mt-2">
          Total Price: ₹{selectedSeats.length * bus.price}
        </p>
        <button
          onClick={handleProceedToPayment}
          disabled={selectedSeats.length === 0}
          className={`mt-4 w-full py-2 rounded ${selectedSeats.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BusDetailsPage;
