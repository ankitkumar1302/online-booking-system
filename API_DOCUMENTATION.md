# BookItNow - API Documentation

## API Overview

BookItNow's backend API is organized around REST principles. The API accepts JSON request bodies, returns JSON responses, and uses standard HTTP response codes to indicate success or failure.

## Base URL

```
Production: https://api.bookitnow.com/v1
Development: http://localhost:3000/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Headers

For authenticated endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer {jwt_token}
```

### Authentication Endpoints

#### User Registration

```
POST /auth/signup
```

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "hasCompletedOnboarding": false
  },
  "token": "jwt_token_here"
}
```

#### User Login

```
POST /auth/login
```

Request body:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "John Doe", 
    "email": "john@example.com",
    "role": "user",
    "hasCompletedOnboarding": true
  },
  "token": "jwt_token_here"
}
```

#### Password Reset Request

```
POST /auth/forgot-password
```

Request body:
```json
{
  "email": "john@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Password reset link sent to email"
}
```

#### Password Reset Confirmation

```
POST /auth/reset-password
```

Request body:
```json
{
  "token": "reset_token_from_email",
  "password": "newSecurePassword456",
  "confirmPassword": "newSecurePassword456"
}
```

Response:
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

#### Logout

```
POST /auth/logout
```

Response:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## User API

### User Profile

#### Get Current User

```
GET /users/me
```

Response:
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "hasCompletedOnboarding": true,
  "preferences": {
    "travelPreferences": ["domestic", "business"],
    "moviePreferences": ["action", "comedy"]
  },
  "createdAt": "2023-01-15T12:00:00Z"
}
```

#### Update User Profile

```
PUT /users/me
```

Request body:
```json
{
  "name": "John Smith",
  "preferences": {
    "travelPreferences": ["international", "leisure"],
    "moviePreferences": ["drama", "sci-fi"]
  }
}
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "John Smith",
    "email": "john@example.com",
    "role": "user",
    "hasCompletedOnboarding": true,
    "preferences": {
      "travelPreferences": ["international", "leisure"],
      "moviePreferences": ["drama", "sci-fi"]
    },
    "updatedAt": "2023-02-20T14:30:00Z"
  }
}
```

#### Complete Onboarding

```
POST /users/onboarding
```

Request body:
```json
{
  "preferences": {
    "travelPreferences": ["domestic", "business"],
    "moviePreferences": ["action", "comedy"]
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Onboarding completed successfully",
  "user": {
    "id": "user_123",
    "hasCompletedOnboarding": true,
    "preferences": {
      "travelPreferences": ["domestic", "business"],
      "moviePreferences": ["action", "comedy"]
    }
  }
}
```

## Booking API

### Flight Bookings

#### Search Flights

```
GET /flights/search
```

Query parameters:
- `origin` (required): Origin airport code
- `destination` (required): Destination airport code
- `departureDate` (required): Date in YYYY-MM-DD format
- `returnDate`: Date in YYYY-MM-DD format (for round trips)
- `passengers`: Number of passengers (default: 1)
- `class`: Class type (economy, business, first)

Response:
```json
{
  "flights": [
    {
      "id": "flight_123",
      "airline": "Sky Airways",
      "flightNumber": "SA456",
      "origin": "JFK",
      "destination": "LAX",
      "departureTime": "2023-05-15T08:30:00Z",
      "arrivalTime": "2023-05-15T11:45:00Z",
      "duration": "3h 15m",
      "price": 299.99,
      "availableSeats": 45,
      "class": "economy"
    },
    // More flight results
  ],
  "metadata": {
    "totalResults": 12,
    "filters": {
      "airlines": ["Sky Airways", "Pacific Air", "Global Airlines"],
      "priceRange": {
        "min": 199.99,
        "max": 599.99
      }
    }
  }
}
```

#### Get Flight Details

```
GET /flights/{flightId}
```

Response:
```json
{
  "id": "flight_123",
  "airline": "Sky Airways",
  "flightNumber": "SA456",
  "origin": {
    "code": "JFK",
    "name": "John F. Kennedy International Airport",
    "city": "New York",
    "terminal": "T4"
  },
  "destination": {
    "code": "LAX",
    "name": "Los Angeles International Airport",
    "city": "Los Angeles",
    "terminal": "T5"
  },
  "departureTime": "2023-05-15T08:30:00Z",
  "arrivalTime": "2023-05-15T11:45:00Z",
  "duration": "3h 15m",
  "aircraft": "Boeing 737-800",
  "amenities": ["WiFi", "In-flight Entertainment", "Power Outlets"],
  "price": 299.99,
  "fareDetails": {
    "base": 249.99,
    "taxes": 35.00,
    "fees": 15.00
  },
  "availableSeats": 45,
  "seatMap": {
    // Seat map data
  },
  "baggageAllowance": {
    "carryOn": "1 bag (7kg)",
    "checked": "1 bag (23kg)"
  }
}
```

#### Book Flight

```
POST /bookings/flights
```

Request body:
```json
{
  "flightId": "flight_123",
  "passengers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "dateOfBirth": "1990-05-15"
    }
  ],
  "selectedSeats": ["12A"],
  "paymentMethod": "card",
  "paymentDetails": {
    "cardToken": "pm_card_token"
  }
}
```

Response:
```json
{
  "success": true,
  "booking": {
    "id": "booking_789",
    "status": "confirmed",
    "referenceNumber": "BKFLT789",
    "flight": {
      "id": "flight_123",
      "airline": "Sky Airways",
      "flightNumber": "SA456",
      "origin": "JFK",
      "destination": "LAX",
      "departureTime": "2023-05-15T08:30:00Z",
      "arrivalTime": "2023-05-15T11:45:00Z"
    },
    "passengers": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "seat": "12A"
      }
    ],
    "totalAmount": 299.99,
    "paymentStatus": "paid",
    "createdAt": "2023-04-10T09:15:00Z"
  },
  "boardingPass": {
    "downloadUrl": "https://api.bookitnow.com/bookings/BKFLT789/boarding-pass"
  }
}
```

### Movie Bookings

#### Search Movies

```
GET /movies/search
```

Query parameters:
- `location` (optional): City or ZIP code
- `date` (optional): Date in YYYY-MM-DD format
- `genre` (optional): Movie genre
- `title` (optional): Movie title search

Response:
```json
{
  "movies": [
    {
      "id": "movie_456",
      "title": "Interstellar Adventure",
      "posterUrl": "https://cdn.bookitnow.com/posters/interstellar.jpg",
      "genre": ["Sci-Fi", "Adventure"],
      "runtime": 165,
      "rating": "PG-13",
      "releaseDate": "2023-03-10",
      "synopsis": "A journey through space and time...",
      "directors": ["Jane Smith"],
      "cast": ["Actor One", "Actor Two", "Actor Three"],
      "averageRating": 4.8
    },
    // More movie results
  ],
  "metadata": {
    "totalResults": 8,
    "filters": {
      "genres": ["Action", "Comedy", "Sci-Fi", "Drama"],
      "ratings": ["G", "PG", "PG-13", "R"]
    }
  }
}
```

#### Get Movie Showtimes

```
GET /movies/{movieId}/showtimes
```

Query parameters:
- `date` (optional): Date in YYYY-MM-DD format
- `location` (optional): City or ZIP code
- `theater` (optional): Theater ID

Response:
```json
{
  "movie": {
    "id": "movie_456",
    "title": "Interstellar Adventure",
    "posterUrl": "https://cdn.bookitnow.com/posters/interstellar.jpg",
    "runtime": 165
  },
  "showtimes": [
    {
      "id": "showtime_123",
      "theaterId": "theater_789",
      "theaterName": "CinePlex Downtown",
      "location": {
        "address": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001"
      },
      "datetime": "2023-05-15T18:30:00Z",
      "format": "IMAX",
      "language": "English",
      "price": 15.99,
      "availableSeats": 64
    },
    // More showtimes
  ]
}
```

#### Book Movie Tickets

```
POST /bookings/movies
```

Request body:
```json
{
  "showtimeId": "showtime_123",
  "seats": ["G12", "G13"],
  "concessions": [
    {
      "item": "Large Popcorn",
      "quantity": 1,
      "price": 8.99
    },
    {
      "item": "Soda Combo",
      "quantity": 2,
      "price": 10.98
    }
  ],
  "paymentMethod": "card",
  "paymentDetails": {
    "cardToken": "pm_card_token"
  }
}
```

Response:
```json
{
  "success": true,
  "booking": {
    "id": "booking_456",
    "status": "confirmed",
    "referenceNumber": "BKMOV456",
    "showtime": {
      "movie": {
        "id": "movie_456",
        "title": "Interstellar Adventure",
        "posterUrl": "https://cdn.bookitnow.com/posters/interstellar.jpg"
      },
      "theater": "CinePlex Downtown",
      "datetime": "2023-05-15T18:30:00Z",
      "format": "IMAX"
    },
    "seats": ["G12", "G13"],
    "concessions": [
      {
        "item": "Large Popcorn",
        "quantity": 1,
        "price": 8.99
      },
      {
        "item": "Soda Combo",
        "quantity": 2,
        "price": 10.98
      }
    ],
    "totalAmount": 45.95,
    "paymentStatus": "paid",
    "createdAt": "2023-04-12T11:30:00Z"
  },
  "tickets": {
    "downloadUrl": "https://api.bookitnow.com/bookings/BKMOV456/tickets"
  }
}
```

### Bus Bookings

#### Search Bus Routes

```
GET /buses/search
```

Query parameters:
- `origin` (required): Origin city or station
- `destination` (required): Destination city or station
- `date` (required): Date in YYYY-MM-DD format
- `passengers` (optional): Number of passengers (default: 1)

Response:
```json
{
  "routes": [
    {
      "id": "route_789",
      "busOperator": "Express Transit",
      "originStation": "New York Bus Terminal",
      "destinationStation": "Boston South Station",
      "departureTime": "2023-05-15T07:00:00Z",
      "arrivalTime": "2023-05-15T11:30:00Z",
      "duration": "4h 30m",
      "price": 49.99,
      "availableSeats": 23,
      "amenities": ["WiFi", "USB Ports", "Restroom"]
    },
    // More route results
  ],
  "metadata": {
    "totalResults": 6,
    "filters": {
      "operators": ["Express Transit", "City Liner", "Regional Bus"],
      "priceRange": {
        "min": 29.99,
        "max": 79.99
      }
    }
  }
}
```

#### Book Bus Tickets

```
POST /bookings/buses
```

Request body:
```json
{
  "routeId": "route_789",
  "passengers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    }
  ],
  "selectedSeats": ["15B"],
  "paymentMethod": "card",
  "paymentDetails": {
    "cardToken": "pm_card_token"
  }
}
```

Response:
```json
{
  "success": true,
  "booking": {
    "id": "booking_123",
    "status": "confirmed",
    "referenceNumber": "BKBUS123",
    "route": {
      "id": "route_789",
      "busOperator": "Express Transit",
      "originStation": "New York Bus Terminal",
      "destinationStation": "Boston South Station",
      "departureTime": "2023-05-15T07:00:00Z",
      "arrivalTime": "2023-05-15T11:30:00Z"
    },
    "passengers": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "seat": "15B"
      }
    ],
    "totalAmount": 49.99,
    "paymentStatus": "paid",
    "createdAt": "2023-04-15T10:45:00Z"
  },
  "ticket": {
    "downloadUrl": "https://api.bookitnow.com/bookings/BKBUS123/ticket"
  }
}
```

## Booking Management API

### Get User Bookings

```
GET /bookings
```

Query parameters:
- `type` (optional): Filter by booking type (flight, movie, bus)
- `status` (optional): Filter by status (confirmed, cancelled, completed)
- `limit` (optional): Number of results per page (default: 10)
- `page` (optional): Page number (default: 1)

Response:
```json
{
  "bookings": [
    {
      "id": "booking_789",
      "type": "flight",
      "referenceNumber": "BKFLT789",
      "status": "confirmed",
      "details": {
        "flight": {
          "airline": "Sky Airways",
          "flightNumber": "SA456",
          "origin": "JFK",
          "destination": "LAX",
          "departureTime": "2023-05-15T08:30:00Z"
        }
      },
      "totalAmount": 299.99,
      "createdAt": "2023-04-10T09:15:00Z"
    },
    {
      "id": "booking_456",
      "type": "movie",
      "referenceNumber": "BKMOV456",
      "status": "confirmed",
      "details": {
        "movie": {
          "title": "Interstellar Adventure",
          "theater": "CinePlex Downtown",
          "datetime": "2023-05-15T18:30:00Z"
        }
      },
      "totalAmount": 45.95,
      "createdAt": "2023-04-12T11:30:00Z"
    },
    // More bookings
  ],
  "pagination": {
    "total": 25,
    "pages": 3,
    "currentPage": 1,
    "limit": 10
  }
}
```

### Get Booking Details

```
GET /bookings/{bookingId}
```

Response:
```json
{
  "id": "booking_789",
  "type": "flight",
  "referenceNumber": "BKFLT789",
  "status": "confirmed",
  "details": {
    "flight": {
      "id": "flight_123",
      "airline": "Sky Airways",
      "flightNumber": "SA456",
      "origin": {
        "code": "JFK",
        "name": "John F. Kennedy International Airport",
        "city": "New York",
        "terminal": "T4"
      },
      "destination": {
        "code": "LAX",
        "name": "Los Angeles International Airport",
        "city": "Los Angeles",
        "terminal": "T5"
      },
      "departureTime": "2023-05-15T08:30:00Z",
      "arrivalTime": "2023-05-15T11:45:00Z",
      "duration": "3h 15m"
    },
    "passengers": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "seat": "12A"
      }
    ]
  },
  "paymentInfo": {
    "totalAmount": 299.99,
    "currency": "USD",
    "paymentMethod": "card",
    "paymentStatus": "paid",
    "lastFour": "4242"
  },
  "createdAt": "2023-04-10T09:15:00Z",
  "boardingPass": {
    "downloadUrl": "https://api.bookitnow.com/bookings/BKFLT789/boarding-pass"
  }
}
```

### Cancel Booking

```
POST /bookings/{bookingId}/cancel
```

Request body:
```json
{
  "reason": "Change of plans"
}
```

Response:
```json
{
  "success": true,
  "booking": {
    "id": "booking_789",
    "status": "cancelled",
    "cancellationInfo": {
      "cancelledAt": "2023-04-20T14:25:00Z",
      "reason": "Change of plans",
      "refundAmount": 269.99,
      "refundStatus": "processing"
    }
  }
}
```

## Admin API

### User Management

#### Get All Users

```
GET /admin/users
```

Query parameters:
- `role` (optional): Filter by role
- `search` (optional): Search by name or email
- `limit` (optional): Results per page
- `page` (optional): Page number

Response:
```json
{
  "users": [
    {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "hasCompletedOnboarding": true,
      "createdAt": "2023-01-15T12:00:00Z",
      "lastLogin": "2023-04-20T09:30:00Z"
    },
    // More users
  ],
  "pagination": {
    "total": 156,
    "pages": 16,
    "currentPage": 1,
    "limit": 10
  }
}
```

#### Get User by ID

```
GET /admin/users/{userId}
```

Response:
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "hasCompletedOnboarding": true,
  "preferences": {
    "travelPreferences": ["domestic", "business"],
    "moviePreferences": ["action", "comedy"]
  },
  "bookings": {
    "total": 5,
    "active": 2,
    "completed": 3
  },
  "createdAt": "2023-01-15T12:00:00Z",
  "lastLogin": "2023-04-20T09:30:00Z"
}
```

### Booking Management

#### Get All Bookings

```
GET /admin/bookings
```

Query parameters:
- `type` (optional): Filter by type
- `status` (optional): Filter by status
- `userId` (optional): Filter by user
- `dateFrom` (optional): Start date
- `dateTo` (optional): End date
- `limit` (optional): Results per page
- `page` (optional): Page number

Response:
```json
{
  "bookings": [
    {
      "id": "booking_789",
      "type": "flight",
      "userId": "user_123",
      "userName": "John Doe",
      "referenceNumber": "BKFLT789",
      "status": "confirmed",
      "details": {
        "flight": {
          "airline": "Sky Airways",
          "flightNumber": "SA456",
          "departureTime": "2023-05-15T08:30:00Z"
        }
      },
      "totalAmount": 299.99,
      "createdAt": "2023-04-10T09:15:00Z"
    },
    // More bookings
  ],
  "pagination": {
    "total": 380,
    "pages": 38,
    "currentPage": 1,
    "limit": 10
  }
}
```

### Analytics

#### Get Booking Statistics

```
GET /admin/analytics/bookings
```

Query parameters:
- `period` (optional): Time period (daily, weekly, monthly)
- `from` (optional): Start date
- `to` (optional): End date

Response:
```json
{
  "totalBookings": 1250,
  "totalRevenue": 89750.45,
  "averageBookingValue": 71.80,
  "bookingsByType": {
    "flight": 750,
    "movie": 320,
    "bus": 180
  },
  "revenueByType": {
    "flight": 65250.50,
    "movie": 12500.95,
    "bus": 11999.00
  },
  "timeline": [
    {
      "date": "2023-04-01",
      "bookings": 42,
      "revenue": 3024.75
    },
    // More timeline data
  ]
}
```

## Error Handling

The API uses standard HTTP status codes to indicate success or failure:

- 200: OK - Request succeeded
- 201: Created - Resource created successfully
- 400: Bad Request - Invalid request format
- 401: Unauthorized - Authentication required
- 403: Forbidden - Insufficient permissions
- 404: Not Found - Resource not found
- 422: Unprocessable Entity - Validation error
- 429: Too Many Requests - Rate limit exceeded
- 500: Internal Server Error - Server error

Error Response Format:

```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```

## Rate Limiting

API requests are rate limited to protect the service. The current limits are:

- Authentication endpoints: 10 requests per minute
- User endpoints: 60 requests per minute
- Search endpoints: 120 requests per minute
- Booking endpoints: 30 requests per minute

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1619194800
```

## Versioning

The API is versioned in the URL path. The current version is v1.

## Webhooks

BookItNow provides webhooks for real-time notifications about events in your account:

- `booking.created`: When a new booking is created
- `booking.updated`: When a booking is updated
- `booking.cancelled`: When a booking is cancelled
- `payment.succeeded`: When a payment succeeds
- `payment.failed`: When a payment fails

Webhook endpoints can be configured in the admin dashboard. 