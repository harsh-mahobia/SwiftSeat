# SwiftSeat

SwiftSeat is a bus seat booking platform for intercity bus travel. It allows users to search for available buses, view bus details, select seats, and make bookings seamlessly.  
**Note:** Currently, SwiftSeat only supports bookings for routes within Hyderabad, Raipur, and Bangalore.

---

## Table of Contents

- [Supported Cities](#supported-cities)
- [Backend API Routes](#backend-api-routes)
  - [Bus Search & Details (`/api/buses`)](#bus-search--details-apibuses)
  - [Bookings (`/api/bookings`)](#bookings-apibookings)
- [Frontend Application](#frontend-application)
  - [Main Pages and Features](#main-pages-and-features)
- [Running Locally](#running-locally)
- [Summary](#summary)

---

## Supported Cities

- Hyderabad
- Raipur
- Bangalore

SwiftSeat currently only supports searching and booking buses between these three cities.

---

## Backend API Routes

### Bus Search & Details (`/api/buses`)

- **`POST /api/buses`**  
  Search for buses between supported cities with filters (date, seat type, AC, time slot, pagination).  
  **Body:**  
    - `departureCity` (required)
    - `arrivalCity` (required)
    - `date` (optional)
    - `seatTypes`, `acTypes`, `times` (optional arrays or comma-separated)
    - `page`, `pageSize` (optional)
  **Response:** List of buses.

- **`GET /api/buses/:busId`**  
  Get detailed info for a specific bus.

---

### Bookings (`/api/bookings`)

- **`POST /api/bookings`**  
  Book seats on a bus.  
  **Body:**  
    - `busId` (required)
    - `seats` (required, array of seat numbers)
    - `passengers` (required, array with name, age, gender)
    - `totalPrice` (required)
  **Response:** Booking confirmation and details.

---

## Frontend Application

The frontend is built with React and provides a user-friendly booking flow:

### Main Pages and Features

| Path                 | Description                                |
|----------------------|--------------------------------------------|
| `/`                  | Home/Search page for buses                 |
| `/buses`             | Shows results/list of available buses      |
| `/bus/:id`           | Bus details and seat selection             |
| `/payment`           | Payment page for selected booking          |
| `/booking-success`   | Success page with booking summary          |
| `*`                  | 404 Not Found                              |

#### Key Features

- **City-to-City Search:** Start by searching for buses between Hyderabad, Raipur, and Bangalore.
- **Filtering:** Filter results by AC type, seat type, and departure time.
- **Bus Details:** View stops, seat availability, and pricing for each bus.
- **Seat Selection:** Interactive seat selection for booking.
- **Booking & Confirmation:** Enter passenger details, pay, and get instant booking confirmation.

---

## Running Locally

1. **Clone the repo**
2. **Backend:**  
   - Navigate to `back/`
   - Install dependencies: `npm install`
   - Start server: `npm run dev`
3. **Frontend:**  
   - Navigate to `frontend/`
   - Install dependencies: `npm install`
   - Start app: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) to use the app.

---

## Summary

- **SwiftSeat** is a city-to-city bus booking platform limited to Hyderabad, Raipur, and Bangalore.
- The backend exposes routes for searching buses and making bookings.
- The frontend offers a smooth booking experience, seat selection, and confirmation.
- For technical details, see the `routes` and `controllers` in the codebase.

---

> For issues or suggestions, please open an issue on GitHub.
