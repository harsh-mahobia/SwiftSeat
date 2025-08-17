import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import BusDetailsPage from "./pages/BusDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import ResultsPage from "./pages/ResultsPage";
import Navbar from "./components/Navbar";
import BookingSuccess from "./pages/BookingSuccess";

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/buses" element={<ResultsPage />} />
        <Route path="/bus/:id" element={<BusDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/booking-success" element={<BookingSuccess/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
