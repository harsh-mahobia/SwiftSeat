// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import BookingHistory from "./pages/BookingHistory";
import PersonalDetails from "./pages/PersonalDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <h1>Bookings Page</h1>
            </ProtectedRoute>
          }
        />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/bookings" element={<BookingHistory />} />
        <Route path="/profile/details" element={<PersonalDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
