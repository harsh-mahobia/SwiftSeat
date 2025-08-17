import { useLocation, useNavigate } from "react-router-dom";

interface Bookings {
  booking : Booking;
  message : string;
}

interface Passengers {
  name: string;
  age : string;
  gender : string;
}

interface Booking {
  bookingId: string;
  busId : String;
  totalPrice : number;
  seats: number[];
  passengers : Passengers[];
}



export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as Bookings;



  if (state.booking === undefined) return <div>no data found !</div>;

  const { booking } = state;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg ">
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
          🎉 Booking Successful!
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Bus Details</h2>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Ticked Id</h2>
            <p>{booking.bookingId?.split('-')[0]}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Booked Seats</h2>
            <p>{booking.seats.map((s) => Number(s)).join(", ")}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Passengers</h2>
            {booking.passengers.map((p, idx) => (
              <p key={idx}>
                {p.name} | {p.gender} | {p.age}
              </p>
            ))}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Total Price</h2>
            <p>₹ {booking.totalPrice}</p>
          </div>
        </div>


        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
