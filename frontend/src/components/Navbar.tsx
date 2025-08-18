import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black p-4 text-white text-xl font-semibold flex justify-between items-center shadow-md">
      <h2 className="text-2xl tracking-wide flex justify-between items-baseline gap-x-4">
        🚌 Swift Seat 
        <p className="hidden md:block text-lg">- A Bus Ticketing System</p>
      </h2>

      <div className="text-lg flex gap-6">
        <Link
          to="/"
          className="hover:text-gray-300 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/"
          className="hover:text-gray-300 transition-colors"
        >
          Search
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
