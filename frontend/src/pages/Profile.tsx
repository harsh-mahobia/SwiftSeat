
const Profile = () => {
  // Dummy data (replace with API response later)
  const userDetails = {
    name: "Harsh Mahobia",
    email: "harsh@example.com",
    phone: "+91 98765 43210",
    address: "Bhopal, Madhya Pradesh, India",
  };

  const bookingHistory = [
    { id: 1, date: "2025-08-05", bus: "Raj Express", seat: "A1", price: "₹850", status: "Completed" },
    { id: 2, date: "2025-07-15", bus: "Volvo Travels", seat: "B3", price: "₹1,200", status: "Completed" },
    { id: 3, date: "2025-06-20", bus: "Intercity Deluxe", seat: "C2", price: "₹950", status: "Cancelled" },
  ];

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      {/* Personal Details */}
      <div className="profile-details">
        <h2>Personal Details</h2>
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Phone:</strong> {userDetails.phone}</p>
        <p><strong>Address:</strong> {userDetails.address}</p>
      </div>

      {/* Booking History */}
      <div className="booking-history">
        <h2>Booking History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Bus Name</th>
              <th>Seat No.</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.date}</td>
                <td>{booking.bus}</td>
                <td>{booking.seat}</td>
                <td>{booking.price}</td>
                <td className={booking.status.toLowerCase()}>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
