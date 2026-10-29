package com.hotel.service;

import com.hotel.domain.Booking;
import java.math.BigDecimal;
import java.time.LocalDate;

public interface BookingService {
    Booking createBooking(String guestName, String guestEmail, String guestPhone, Long roomId,
                          LocalDate checkIn, LocalDate checkOut);

    void cancelBooking(Long bookingId);

    BigDecimal calculateTotalBill(Long roomId, LocalDate checkIn, LocalDate checkOut);
}
