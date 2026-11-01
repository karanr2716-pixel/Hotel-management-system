# StayEase Hotel Management System

StayEase is a local hotel discovery and booking demo. It includes a responsive web interface, a Java/Spring Boot REST API, and an in-memory H2 database populated with sample data.

## Features

- Browse sample hotels and rooms, with prices in INR, amenities, and guest capacity.
- Filter rooms by room type, maximum price, guest count, city, and stay dates.
- Create bookings, look up bookings by email or booking ID, and cancel confirmed bookings.
- View bookings in the owner dashboard.
- Use sample hotel and room data in the frontend if the API is unavailable. Booking actions require the backend.
- Start without setting up a separate database. H2 data is reset when the application restarts.

## Technology

- Java 17
- Spring Boot 3.3.5
- Spring Web, Spring Data JPA, and Jakarta Bean Validation
- H2 database
- HTML, Tailwind CSS CDN, and vanilla JavaScript
- Maven

## Requirements

Install a JDK 17 and Apache Maven. Check that both are available in a new terminal:

```powershell
java -version
mvn -version
```

If PowerShell reports that `mvn` is not recognized, Maven is either not installed or its `bin` directory is missing from `PATH`. Install Apache Maven, add its `bin` directory to `PATH`, and restart VS Code so its terminals pick up the updated environment.

## Run locally

In PowerShell, change to the project root and start Spring Boot:

```powershell
cd "C:\path\to\Hotel-mangement-system2"
mvn spring-boot:run
```

Wait for Spring Boot to finish starting, then open:

**http://localhost:8080**

The application serves its frontend from Spring Boot. Keep the terminal running while you use the site; press **Ctrl+C** in that terminal to stop it.

To build a runnable JAR:

```powershell
mvn clean package
java -jar target/hotel-management-system-1.0.0.jar
```

If the page does not load, check that startup completed without errors and that port `8080` is not already in use. The browser URL will not work when the application is stopped.

## Project structure

```text
.
├── pom.xml
└── src/main
    ├── java/com/hotel
    │   ├── domain/       # Users, hotels, rooms, bookings, and enums
    │   ├── repository/   # Spring Data JPA repositories
    │   ├── service/      # Booking rules and room factory
    │   ├── web/          # REST controllers and API models
    │   └── HotelApplication.java
    └── resources
        ├── application.properties
        ├── schema.sql
        ├── data.sql
        └── static
            ├── index.html
            └── app.js
```

## Design overview

- `User` and `Room` are abstract domain classes with specialized customer/admin and room implementations.
- Enums represent roles, room types, room statuses, and booking statuses.
- `RoomFactory` creates a room implementation for a requested room type.
- `HotelBookingService` contains booking, cancellation, quote, date, and availability logic.
- Spring Data repositories handle persistence; REST controllers expose the API.

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/hotels` | List hotels |
| `GET` | `/api/rooms` | List rooms; optional filters: `type`, `maxPrice`, `guests`, `city`, `checkIn`, `checkOut` |
| `GET` | `/api/bookings` | List bookings for the owner view |
| `GET` | `/api/bookings/lookup?email=...` | Find bookings by guest email |
| `GET` | `/api/bookings/lookup/{bookingId}` | Find a booking by ID |
| `POST` | `/api/bookings` | Create a booking |
| `GET` | `/api/bookings/quote?roomId=...&checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD` | Calculate a stay quote |
| `DELETE` | `/api/bookings/{bookingId}` | Cancel a confirmed booking |

Example request to create a booking:

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

Dates must be valid future dates, and check-out must be after check-in. Confirmed bookings cannot overlap for the same room.

## Database and sample data

The application uses an in-memory H2 database at `jdbc:h2:mem:stayease`. The schema and demo records are loaded from `schema.sql` and `data.sql` when the application starts. Database contents do not persist across restarts.

For local development, the H2 console is available at **http://localhost:8080/h2-console**:

| Setting | Value |
| --- | --- |
| JDBC URL | `jdbc:h2:mem:stayease` |
| User name | `sa` |
| Password | *(blank)* |

## Frontend and external assets

The frontend is in `src/main/resources/static`. It uses Tailwind CSS from its CDN, Google Fonts, and remote Unsplash images; internet access is needed for those external assets. If the browser shows an older frontend version, perform a hard refresh (for example, **Ctrl+F5**).

## Demo security

This project is intended for local demonstration, not production deployment. The owner view exposes guest booking/contact details without authentication, and the H2 console is enabled. Do not expose the application to an untrusted network without adding appropriate authentication, authorization, and production database/security configuration.
