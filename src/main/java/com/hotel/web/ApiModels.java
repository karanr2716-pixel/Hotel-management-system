package com.hotel.web;

import com.hotel.domain.Booking;
import com.hotel.domain.BookingStatus;
import com.hotel.domain.Hotel;
import com.hotel.domain.Room;
import com.hotel.domain.RoomStatus;
import com.hotel.domain.RoomType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public final class ApiModels {
    private ApiModels() {
    }

    public record RoomRequest(@NotNull RoomType type, @NotBlank String roomNumber,
                              @NotNull @DecimalMin("1.00") BigDecimal pricePerNight,
                              @NotEmpty List<@NotBlank String> amenities,
                              RoomStatus status, @NotNull Long hotelId) {
    }

    public record RoomView(Long roomId, String roomNumber, RoomType type, BigDecimal pricePerNight,
                           BigDecimal nightlyRate, int maxGuests, RoomStatus status, boolean available, List<String> amenities,
                           Long hotelId, String hotelName, String city, BigDecimal rating, String imageUrl) {
        static RoomView from(Room room) {
            Hotel hotel = room.getHotel();
            return new RoomView(room.getRoomId(), room.getRoomNumber(), room.getRoomType(),
                    room.getPricePerNight(), room.calculateBasePrice(), room.getMaxGuests(), room.getStatus(),
                    room.isAvailable(), room.getAmenities(),
                    hotel == null ? null : hotel.getHotelId(),
                    hotel == null ? "Maison Collection" : hotel.getName(),
                    hotel == null ? "India" : hotel.getCity(),
                    hotel == null ? new BigDecimal("4.8") : hotel.getRating(),
                    hotel == null ? HotelView.DEFAULT_IMAGE : hotel.getImageUrl());
        }
    }

    public record HotelView(Long hotelId, String name, String city, String description, String imageUrl,
                            BigDecimal rating, long roomCount) {
        static final String DEFAULT_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85";

        static HotelView from(Hotel hotel, long roomCount) {
            return new HotelView(hotel.getHotelId(), hotel.getName(), hotel.getCity(), hotel.getDescription(),
                    hotel.getImageUrl(), hotel.getRating(), roomCount);
        }
    }

    public record BookingRequest(@NotNull Long roomId, @NotNull LocalDate checkIn, @NotNull LocalDate checkOut,
                                 @NotBlank String guestName, @NotBlank String guestEmail,
                                 @NotBlank String guestPhone) {
    }

    public record BookingView(Long bookingId, Long roomId, String roomNumber, RoomType roomType,
                              LocalDate checkIn, LocalDate checkOut, BookingStatus status,
                              BigDecimal totalAmount, String guestName, String guestEmail, String guestPhone,
                              String hotelName, String city) {
        static BookingView from(Booking booking) {
            Hotel hotel = booking.getRoom().getHotel();
            return new BookingView(booking.getBookingId(), booking.getRoom().getRoomId(),
                    booking.getRoom().getRoomNumber(), booking.getRoom().getRoomType(),
                    booking.getCheckIn(), booking.getCheckOut(), booking.getStatus(),
                    booking.getTotalAmount(), booking.getCustomer().getName(), booking.getCustomer().getEmail(),
                    booking.getCustomer().getPhone(),
                    hotel == null ? "Maison Collection" : hotel.getName(),
                    hotel == null ? "India" : hotel.getCity());
        }
    }

    public record ErrorView(String message) {
    }
}
