package com.hotel.web;

import com.hotel.domain.Booking;
import com.hotel.repository.BookingRepository;
import com.hotel.service.BookingService;
import com.hotel.web.ApiModels.BookingRequest;
import com.hotel.web.ApiModels.BookingView;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BookingController {
    private final BookingRepository bookingRepository;
    private final BookingService bookingService;

    public BookingController(BookingRepository bookingRepository, BookingService bookingService) {
        this.bookingRepository = bookingRepository;
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public List<BookingView> allBookings() {
        return bookingRepository.findAllByOrderByCheckInDesc().stream().map(BookingView::from).toList();
    }

    @GetMapping("/bookings/lookup")
    public List<BookingView> lookupBookings(@RequestParam String email) {
        if (email.isBlank()) {
            throw new IllegalArgumentException("Enter the email used for your booking");
        }
        return bookingRepository.findAllByCustomerEmailIgnoreCaseOrderByCheckInDesc(email.trim())
                .stream().map(BookingView::from).toList();
    }

    @GetMapping("/bookings/lookup/{bookingId}")
    public BookingView lookupBooking(@PathVariable Long bookingId) {
        return bookingRepository.findWithDetailsById(bookingId)
                .map(BookingView::from)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
    }

    @PostMapping("/bookings")
    @ResponseStatus(HttpStatus.CREATED)
    public BookingView createBooking(@Valid @RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(request.guestName().trim(), request.guestEmail().trim(),
                request.guestPhone().trim(), request.roomId(), request.checkIn(), request.checkOut());
        return BookingView.from(booking);
    }

    @GetMapping("/bookings/quote")
    public BigDecimal quote(@RequestParam Long roomId,
                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        return bookingService.calculateTotalBill(roomId, checkIn, checkOut);
    }

    @DeleteMapping("/bookings/{bookingId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }

}
