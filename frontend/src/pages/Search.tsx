import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import busData from "../data/buses.json"; // Temporary JSON dataset



const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromCity = queryParams.get("from") || "";
  const toCity = queryParams.get("to") || "";

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    /** 
     * 🚀 In Future - Fetch from Backend
     * fetch(`/api/buses?from=${fromCity}&to=${toCity}`)
     *   .then(res => res.json())
     *   .then(data => {
     *       setBuses(data);
     *       setLoading(false);
     *   })
     *   .catch(err => {
     *       console.error(err);
     *       setLoading(false);
     *   });
     */

    // Temporary - Filter from local JSON
    const filtered = busData.filter(
      bus =>
        bus.from.toLowerCase() === fromCity.toLowerCase() &&
        bus.to.toLowerCase() === toCity.toLowerCase()
    );

    setTimeout(() => {
      setBuses(filtered);
      setLoading(false);
    }, 500); // simulate delay
  }, [fromCity, toCity]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Buses from <span className="text-blue-600">{fromCity}</span> to{" "}
        <span className="text-blue-600">{toCity}</span>
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading buses...</p>
      ) : buses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {buses.map(bus => (
            <div
              key={bus.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{bus.name}</h2>
                <p className="text-gray-600">
                  {bus.departure} → {bus.arrival}
                </p>
                <p className="text-gray-600">Seats Available: {bus.seatsAvailable}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-bold text-green-600">₹{bus.price}</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-semibold">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500">No buses found for this route.</p>
      )}
    </div>
  );
};

export default Search;
