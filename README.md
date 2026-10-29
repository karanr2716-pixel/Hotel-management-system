# StayEase Hotel Management System

StayEase is a responsive hotel discovery and booking demo built with Java 17 and Spring Boot. It combines an object-oriented hotel domain, REST APIs, an H2 database initialized with SQL demo data, and a single-page Tailwind CSS frontend.

## Features

- Browse five sample hotels across Jaipur, Mumbai, Goa, Delhi, and Udaipur.
- Explore room types, amenities, prices in INR, guest capacity, and date-based availability.
- Filter rooms by destination, room type, guest count, and stay dates.
- Create bookings, look up reservations by email or booking ID, and cancel confirmed bookings.
- Open the owner booking view to see all seeded and newly created reservations.
- Load demo hotel and room data from JavaScript fallbacks if the API is unavailable. Booking operations require the backend.
- Use the H2 in-memory database for a zero-external-database local demo. Database contents reset when the application restarts.

## Technology

- Java 17
- Spring Boot 3.3.5
- Spring Web and REST
- Spring Data JPA
- H2
- Jakarta Bean Validation
- HTML, Tailwind CSS CDN, and vanilla JavaScript
- Maven

## Architecture and OOP

The application separates domain behavior, persistence, business rules, and HTTP endpoints:

- **Domain model (`com.hotel.domain`)**: `User` and `Room` are abstract base classes. `Customer` and `Admin` specialize `User`; concrete room classes specialize `Room`. `Booking` links a customer and room, holds stay dates and status, and calculates its total.
- **Encapsulation and polymorphism**: Domain fields are private, and room subclasses provide room-specific type and base-price behavior through abstract methods.
- **Enums**: Roles, room types, room statuses, and booking statuses use enums rather than free-form values.
- **Factory pattern**: `RoomFactory` selects a concrete room implementation from a `RoomType`.
- **Service layer**: `BookingService` defines booking operations; `HotelBookingService` validates dates and availability, calculates quotes, creates reservations, and cancels bookings transactionally.
- **Repository pattern**: Spring Data JPA repositories isolate data access from service and controller code.
- **REST controllers (`com.hotel.web`)**: Controllers expose hotel, room, and booking resources without mixing HTTP handling into domain logic.

## Project layout

```text
.
├── pom.xml
└── src/
    └── main/
        ├── java/com/hotel/
        │   ├── domain/       # Users, hotels, rooms, bookings, and enums
        │   ├── repository/   # Spring Data JPA repositories
        │   ├── service/      # Booking rules and room factory
        │   ├── web/          # REST controllers and API models
        │   └── HotelApplication.java
        └── resources/
            ├── application.properties
            ├── schema.sql    # H2 table definitions
            ├── data.sql      # Hotels, rooms, amenities, guests, bookings
            └── static/
                ├── index.html
                └── app.js
```

## Run locally

Prerequisites: JDK 17 and Maven.

From the project root, start the application:

```bash
mvn spring-boot:run
```

Then open **http://localhost:8080**.

To package and run the executable JAR instead:

```bash
mvn clean package
java -jar target/hotel-management-system-1.0.0.jar
```

Spring Boot runs `schema.sql` and `data.sql` at startup. The configured database is H2 in-memory (`jdbc:h2:mem:stayease`), so no separate database setup is needed. Internet access is needed for the Tailwind CDN, Google Fonts, and remote Unsplash photos.

## Demo data

The SQL scripts create tables for users, hotels, rooms, room amenities, and bookings. The sample catalog contains five hotels, three rooms per hotel, and four sample bookings with confirmed and cancelled statuses. Seeded guests are sample contact records, not login accounts; the application does not provide an authentication flow.

The H2 console is enabled for local development at **http://localhost:8080/h2-console**:

| Setting | Value |
| --- | --- |
| JDBC URL | `jdbc:h2:mem:stayease` |
| User name | `sa` |
| Password | *(blank)* |

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/hotels` | List hotels and room counts |
| `GET` | `/api/rooms` | List available rooms; optional filters include `type`, `maxPrice`, `guests`, `city`, `checkIn`, and `checkOut` |
| `GET` | `/api/bookings` | List all bookings for the owner view |
| `GET` | `/api/bookings/lookup?email=...` | Find bookings by guest email |
| `GET` | `/api/bookings/lookup/{bookingId}` | Find one booking by ID |
| `POST` | `/api/bookings` | Create a booking |
| `GET` | `/api/bookings/quote?roomId=...&checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD` | Calculate a stay quote |
| `DELETE` | `/api/bookings/{bookingId}` | Cancel a confirmed booking |

Example booking request:

```json
{
  "guestName": "Aarav Sharma",
  "guestEmail": "aarav.sharma@example.com",
  "guestPhone": "+91 98765 43210",
  "roomId": 1,
  "checkIn": "2027-01-10",
  "checkOut": "2027-01-12"
}
```

Dates must be valid future dates, with check-out after check-in. A room cannot be booked for dates overlapping another confirmed reservation.

## Frontend

The single-page interface is served from Spring Boot's static resources. `index.html` defines the responsive layout and Tailwind CDN setup; `app.js` calls the REST API, renders hotels and rooms, and handles booking, lookup, cancellation, and owner-view interactions. If the browser displays stale assets, use a hard refresh (for example, **Ctrl+F5**).

## Demo security note

The owner view exposes guest booking and contact details without authentication, and the H2 console is enabled. This setup is for local demonstration only. Do not expose this application or its console to an untrusted network without adding authentication, authorization, and production database/security configuration.
