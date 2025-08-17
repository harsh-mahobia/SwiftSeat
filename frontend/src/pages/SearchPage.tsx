import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/buses?departureCity=${departureCity}&arrivalCity=${arrivalCity}&date=${date}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Search Buses</h2>
        <input
          type="text"
          placeholder="Departure City"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <input
          type="text"
          placeholder="Arrival City"
          value={arrivalCity}
          onChange={(e) => setArrivalCity(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchPage;
