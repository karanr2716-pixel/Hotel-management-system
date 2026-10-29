package com.hotel.service;

import com.hotel.domain.Booking;
import com.hotel.domain.BookingStatus;
import com.hotel.domain.Customer;
import com.hotel.domain.Room;
import com.hotel.domain.RoomStatus;
import com.hotel.repository.BookingRepository;
import com.hotel.repository.RoomRepository;
import com.hotel.repository.UserRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HotelBookingService implements BookingService {
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public HotelBookingService(BookingRepository bookingRepository, RoomRepository roomRepository,
                               UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Booking createBooking(String guestName, String guestEmail, String guestPhone, Long roomId,
                                 LocalDate checkIn, LocalDate checkOut) {
        validateDates(checkIn, checkOut);
        Room room = roomRepository.findLockedByRoomId(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));
        if (room.getStatus() != RoomStatus.AVAILABLE) {
            throw new IllegalArgumentException("This room is under maintenance");
        }
        if (bookingRepository.existsOverlappingBooking(roomId, BookingStatus.CONFIRMED, checkIn, checkOut)) {
            throw new IllegalArgumentException("This room is not available for the selected dates");
        }
        Customer customer = userRepository.findCustomerByEmailIgnoreCase(guestEmail)
                .orElseGet(() -> userRepository.save(new Customer(guestName, guestEmail, guestPhone)));
        customer.setName(guestName);
        customer.setPhone(guestPhone);
        return bookingRepository.save(customer.bookRoom(room, checkIn, checkOut));
    }

    @Override
    @Transactional
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        booking.cancel();
    }

    @Override
    @Transactional(readOnly = true)
    public BigDecimal calculateTotalBill(Long roomId, LocalDate checkIn, LocalDate checkOut) {
        validateDates(checkIn, checkOut);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));
        if (room.getStatus() != RoomStatus.AVAILABLE
                || bookingRepository.existsOverlappingBooking(roomId, BookingStatus.CONFIRMED, checkIn, checkOut)) {
            throw new IllegalArgumentException("This room is not available for the selected dates");
        }
        return room.calculateBasePrice().multiply(BigDecimal.valueOf(ChronoUnit.DAYS.between(checkIn, checkOut)));
    }

    private void validateDates(LocalDate checkIn, LocalDate checkOut) {
        if (checkIn == null || checkOut == null || !checkIn.isBefore(checkOut) || checkIn.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Choose a valid future check-in date and a later check-out date");
        }
    }
}
