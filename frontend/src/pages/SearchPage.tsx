import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MapPin, Calendar } from "lucide-react";

const SearchPage = () => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!departureCity || !arrivalCity || !date) {
      toast.error("Please fill all fields!");
      return;
    }

    navigate(
      `/buses?departureCity=${departureCity}&arrivalCity=${arrivalCity}&date=${date}`
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-300"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Find Your Bus
        </h2>

        {/* Departure City */}
        <div className="flex items-center border rounded-xl p-3 mb-4 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-black transition">
          <MapPin className="text-black mr-2" />
          <input
            type="text"
            placeholder="Departure City"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            className="w-full bg-transparent outline-none text-black placeholder-gray-500"
            required
          />
        </div>

        {/* Arrival City */}
        <div className="flex items-center border rounded-xl p-3 mb-4 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-black transition">
          <MapPin className="text-black mr-2" />
          <input
            type="text"
            placeholder="Arrival City"
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
            className="w-full bg-transparent outline-none text-black placeholder-gray-500"
            required
          />
        </div>

        {/* Date */}
        <div className="flex items-center border rounded-xl p-3 mb-6 bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-black transition">
          <Calendar className="text-black mr-2" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent outline-none text-black placeholder-gray-500"
            required
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-gray-800 transition-transform transform hover:scale-105"
        >
          🔍 Search Buses
        </button>
      </form>
    </div>
  );
};

export default SearchPage;
