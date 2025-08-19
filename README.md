# SwiftSeat API Documentation

> **Live Demo**: [swift-seat-mu.vercel.app](https://swift-seat-mu.vercel.app)
>
> **Important Notice**: SwiftSeat currently only operates bus services between three cities:
> - Raipur
> - Bangalore
> - Hyderabad
>
> Bookings are only available for routes connecting these three cities.

## Backend API Routes

SwiftSeat provides the following API endpoints for bus searching, seat management, and booking functionality:

### 1. Bus Search & Details (`/api/buses`)

#### POST `/api/buses`
Search for buses between supported cities with various filters.

**Request Body:**
- `departureCity` (required): Starting city (must be one of: Raipur, Bangalore, or Hyderabad)
- `arrivalCity` (required): Destination city (must be one of: Raipur, Bangalore, or Hyderabad)
- `date` (required): Journey date
- `seatTypes` (optional): Array or comma-separated values ['seater', 'semi-sleeper', 'sleeper']
- `acTypes` (optional): Array or comma-separated values ['AC', 'NON-AC']
- `times` (optional): Array or comma-separated values ['Morning', 'Afternoon', 'Evening', 'Night']
- `page` (optional): Page number for pagination (default: 1)
- `pageSize` (optional): Results per page (default: 10)

**Response:**
```json
{
  "success": true,
  "totalPage": number,
  "totalBuses": number,
  "currentPage": number,
  "buses": Array<Bus>
}
```

#### GET `/api/buses/:busId`
Get detailed information for a specific bus.

**Parameters:**
- `busId`: ID of the bus

**Response:** Detailed bus information including stops, seat availability, and pricing.

### 2. Bookings Management (`/api/bookings`)

#### POST `/api/bookings`
Create a new booking for selected seats.

**Request Body:**
- `busId` (required): ID of the bus to book
- `seats` (required): Array of seat numbers to book
- `passengers` (required): Array of passenger details
  - `name`: Passenger name
  - `age`: Passenger age
  - `gender`: Passenger gender ('male' | 'female' | 'other')
- `totalPrice` (required): Total booking amount

**Response:**
```json
{
  "message": "Booking successful",
  "booking": BookingDetails
}
```

### 3. Seat Management (`/api/seats`)

#### POST `/api/seats/lock`
Temporarily lock selected seats during the booking process.

**Request Body:**
- `busId`: ID of the bus
- `seats`: Array of seat numbers to lock

**Response:** Confirmation of seats being locked for booking.

## Available Routes

Currently, SwiftSeat offers the following bus routes:
- Raipur ↔️ Bangalore
- Raipur ↔️ Hyderabad
- Bangalore ↔️ Hyderabad

Note: All routes are available in both directions.

## Frontend Routes

The frontend application provides the following routes for user interaction:

| Path | Description |
|------|-------------|
| `/` | Home/Search page for finding buses |
| `/buses` | Display search results and available buses |
| `/bus/:id` | Bus details and seat selection interface |
| `/payment` | Payment processing and passenger details |
| `/booking-success` | Booking confirmation page |
| `*` | 404 Not Found page |

## Key Features

1. **Search Functionality**
   - City-to-city bus search (limited to Raipur, Bangalore, and Hyderabad)
   - Multiple filter options (AC/Non-AC, seat types, time slots)
   - Pagination support

2. **Booking System**
   - Interactive seat selection
   - Temporary seat locking during booking
   - Passenger information management
   - Booking confirmation system

3. **Bus Details**
   - Comprehensive bus information
   - Real-time seat availability
   - Pricing details
   - Route information with stops

## Technical Notes

- All API endpoints return appropriate HTTP status codes
- Error handling is implemented across all routes
- CORS is enabled for cross-origin requests
- City validation is enforced for all route searches
- Frontend deployed at: [swift-seat-mu.vercel.app](https://swift-seat-mu.vercel.app)
