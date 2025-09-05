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
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md mb-8 bg-gradient-to-r from-indigo-500 to-purple-700 text-white p-5 rounded-2xl shadow-lg flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          ℹ️ Important Note
        </h3>
        <p className="text-sm mb-3">Currently this website works only for:</p>
        <ul className="list-disc list-inside space-y-1 text-sm flex gap-2 justify-center items-center">
          <li>Hyderabad</li>
          <li>Raipur</li>
          <li>Bangalore</li>
        </ul>
        <div className="mt-3 text-sm">
          <p className="font-medium">Available date range:</p>
          <p className="bg-white/20 w-fit px-3 py-1 mt-1 rounded-md shadow-sm">
            20-08-2025 ➝ 30-08-2025
          </p>
        </div>
      </div>

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
