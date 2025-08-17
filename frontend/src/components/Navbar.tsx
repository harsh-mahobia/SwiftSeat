import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white text-xl font-semibold flex justify-between">
      <h2>Bus Ticketing</h2>
      <div className="text-lg w-1/3 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/"  >Search</Link>
      </div>
    </nav>
  );
};

export default Navbar;
