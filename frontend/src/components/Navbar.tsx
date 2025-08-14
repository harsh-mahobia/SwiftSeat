// src/components/Navbar.tsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../auth/authService";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown toggle
  const [user, setUser] = useState(getCurrentUser());
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync user state with storage changes
  useEffect(() => {
    const onStorage = () => setUser(getCurrentUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setProfileOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      window.addEventListener("click", onClick);
    }
    return () => window.removeEventListener("click", onClick);
  }, [profileOpen]);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          SwiftSeat
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
          <Link to="/search" className="hover:text-gray-200 transition-colors">Search</Link>
          <Link to="/contact" className="hover:text-gray-200 transition-colors">Contact</Link>

          {/* Auth/Profile */}
          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-200 transition-colors">Login</Link>
              <Link to="/register" className="hover:text-gray-200 transition-colors">Register</Link>
            </>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 hover:text-gray-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={profileOpen}
              >
                <div className="h-9 w-9 rounded-full bg-white/30 flex items-center justify-center font-semibold">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <span className="hidden sm:inline">{user.name ?? "Profile"}</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-12 w-56 rounded-xl border border-black/10 bg-white text-gray-900 shadow-lg ring-1 ring-black/5 z-50"
                >
                  <div className="py-1">
                    <Link
                      to="/profile/bookings"
                      className="block px-4 py-2 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Booking History
                    </Link>
                    <Link
                      to="/profile/details"
                      className="block px-4 py-2 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Personal Details
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none text-lg"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 px-4 py-3 space-y-2">
          <Link to="/" className="block hover:text-gray-200">Home</Link>
          <Link to="/search" className="block hover:text-gray-200">Search</Link>
          <Link to="/contact" className="block hover:text-gray-200">Contact</Link>

          {!user ? (
            <>
              <Link to="/login" className="block hover:text-gray-200">Login</Link>
              <Link to="/register" className="block hover:text-gray-200">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile/bookings" className="block hover:text-gray-200">Booking History</Link>
              <Link to="/profile/details" className="block hover:text-gray-200">Personal Details</Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
