import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/axios";

interface Stop {
  city: string;
  time: string;
  date: string;
}

interface Bus {
  _id: any;
  number: string;
  slot: string;
  ac: boolean;
  seatType: string;
  tripDate: string;
  name: string;
  stops: Stop[];
  price: number;
  capacity: number;
  seatsBooked: string[];
}

const seatTypes = ["seater", "semi-sleeper", "sleeper"];
const acTypes = ["AC", "NON-AC"];
const departureTimes = ["Morning", "Afternoon", "Evening", "Night"];

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const departureCity = queryParams.get("departureCity") || "";
  const arrivalCity = queryParams.get("arrivalCity") || "";
  const date = queryParams.get("date") || "";

  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedSeatTypes, setSelectedSeatTypes] = useState<string[]>([]);
  const [selectedAcTypes, setSelectedAcTypes] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false); // 👈 mobile toggle

  const pageSize = 5;

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const start = Date.now();
      
      const { data } = await api.post("/api/buses",{
        seatTypes: selectedSeatTypes,
        acTypes: selectedAcTypes,
        times: selectedTimes,
      }, {
        params: { departureCity, arrivalCity, date, page, pageSize },
      });

      const elapsed = Date.now() - start;
      const minDelay = 1000;

     

      setTimeout(() => {
        setBuses(data.buses);
        setTotalPages(data.totalPage); // ✅ backend sends totalPage
        setLoading(false);
      }, Math.max(minDelay - elapsed, 0));
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departureCity, arrivalCity, date, page, selectedSeatTypes, selectedAcTypes, selectedTimes]);

  const toggleSelection = (item: string, state: string[], setState: any) => {
    if (state.includes(item)) setState(state.filter((i) => i !== item));
    else setState([...state, item]);
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-1 rounded bg-black text-white"
        >
          {showFilters ? "Close" : "Open"}
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside
        className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-1/4 p-6 bg-white shadow-md`}
      >
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Seat Type */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Seat Type</h3>
          {seatTypes.map((type) => (
            <label key={type} className="flex items-center mb-1">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedSeatTypes.includes(type)}
                onChange={() => toggleSelection(type, selectedSeatTypes, setSelectedSeatTypes)}
              />
              {type}
            </label>
          ))}
        </div>

        {/* AC Type */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">AC Type</h3>
          {acTypes.map((type) => (
            <label key={type} className="flex items-center mb-1">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedAcTypes.includes(type)}
                onChange={() => toggleSelection(type, selectedAcTypes, setSelectedAcTypes)}
              />
              {type}
            </label>
          ))}
        </div>

        {/* Departure Time */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Departure Time</h3>
          {departureTimes.map((time) => (
            <label key={time} className="flex items-center mb-1">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedTimes.includes(time)}
                onChange={() => toggleSelection(time, selectedTimes, setSelectedTimes)}
              />
              {time}
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-6">Available Buses</h2>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {buses.map((bus, index) => (
              <div
                key={index}
                className="bg-white rounded shadow p-4 flex flex-col md:flex-row justify-between md:items-center gap-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">{bus.name}</h3>
                  <p className="text-gray-600">{bus.stops.map((s) => s.city).join(" → ")}</p>
                  <p className="text-gray-600 mt-1">
                    Date: {new Date(bus.tripDate).toLocaleDateString()} | Time:{" "}
                    {bus.slot.charAt(0).toUpperCase() + bus.slot.slice(1)}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                      {bus.seatType}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        bus.ac ? "bg-yellow-100 text-yellow-800" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {bus.ac ? "AC" : "NON-AC"}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                      Seats: {bus.capacity - bus.seatsBooked.length}/{bus.capacity}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end">
                  <span className="text-green-600 font-semibold text-lg">₹{bus.price}</span>
                  <button
                    className={`mt-2 px-4 py-1 rounded ${
                      bus.seatsBooked.length >= bus.capacity
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                    disabled={bus.seatsBooked.length >= bus.capacity}
                    onClick={() => navigate(`/bus/${bus._id}`)}
                  >
                    {bus.seatsBooked.length >= bus.capacity ? "Full" : "Book Now"}
                  </button>
                </div>
              </div>
            ))}

            {buses.length === 0 && (
              <p className="text-gray-500 text-center mt-6">No buses found for selected filters.</p>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && (
          <div className="flex flex-wrap justify-center mt-6 gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => goToPage(idx + 1)}
                className={`px-3 py-1 rounded ${page === idx + 1 ? "bg-black text-white" : "bg-gray-200"}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResultsPage;
