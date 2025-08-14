import { useState } from "react";
import { useNavigate } from "react-router-dom";
import citiesData from "../data/cities.json";
import { Search } from "lucide-react";

type City = string; // Each city in JSON is just a string

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");
  const [fromSuggestions, setFromSuggestions] = useState<City[]>([]);
  const [toSuggestions, setToSuggestions] = useState<City[]>([]);

  const cities: City[] = citiesData as City[];

  const handleSearch = (): void => {
    if (!fromCity || !toCity) {
      alert("Please enter both source and destination cities.");
      return;
    }
    if (fromCity === toCity) {
      alert("Source and Destination cannot be same");
      return;
    }
    navigate(
      `/search?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(
        toCity
      )}`
    );
  };

  const filterCities = (input: string): City[] => {
    if (!input) return [];
    return cities.filter((city) =>
      city.toLowerCase().startsWith(input.toLowerCase())
    );
  };

  return (
    <div>
      {/* 1️⃣ Search Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-500 to-indigo-600 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h1 className="text-4xl font-extrabold mb-4">Book Your Next Journey</h1>
          <p className="text-lg opacity-90 mb-10">
            Find buses to 200+ destinations across India
          </p>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* From City */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="From City"
                value={fromCity}
                onChange={(e) => {
                  setFromCity(e.target.value);
                  setFromSuggestions(filterCities(e.target.value));
                }}
                className="p-3 rounded-lg text-black w-full focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              {fromSuggestions.length > 0 && (
                <ul className="absolute bg-white/95 text-black w-full mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                  {fromSuggestions.map((city, idx) => (
                    <li
                      key={idx}
                      className="p-2 hover:bg-yellow-100 cursor-pointer"
                      onClick={() => {
                        setFromCity(city);
                        setFromSuggestions([]);
                      }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* To City */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="To City"
                value={toCity}
                onChange={(e) => {
                  setToCity(e.target.value);
                  setToSuggestions(filterCities(e.target.value));
                }}
                className="p-3 rounded-lg text-black w-full focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              {toSuggestions.length > 0 && (
                <ul className="absolute bg-white/95 text-black w-full mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                  {toSuggestions.map((city, idx) => (
                    <li
                      key={idx}
                      className="p-2 hover:bg-yellow-100 cursor-pointer"
                      onClick={() => {
                        setToCity(city);
                        setToSuggestions([]);
                      }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all shadow-md hover:shadow-lg"
            >
              <Search size={18} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* 2️⃣ Popular Destinations */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["Goa", "Jaipur", "Manali", "Kerala"].map((place) => (
            <div
              key={place}
              className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={`/images/${place.toLowerCase()}.jpg`}
                alt={place}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center font-semibold">{place}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3️⃣ Why Choose Us */}
      <section className="bg-gray-100 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose SwiftSeat?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "🚌",
              title: "Comfortable Rides",
              desc: "Enjoy safe and cozy travel in premium buses.",
            },
            {
              icon: "⚡",
              title: "Instant Booking",
              desc: "Book tickets in seconds with instant confirmation.",
            },
            {
              icon: "💰",
              title: "Affordable Prices",
              desc: "Best prices for your next trip, guaranteed.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4️⃣ Testimonials */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Amit Kumar",
              review:
                "Amazing service! Booking was super easy and buses were very comfortable.",
            },
            {
              name: "Priya Sharma",
              review:
                "Affordable prices and smooth travel experience. Highly recommend!",
            },
            {
              name: "Rahul Verma",
              review:
                "Loved the instant booking and great customer support.",
            },
          ].map((test, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <p className="text-gray-600 mb-4">“{test.review}”</p>
              <div className="font-bold">{test.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
