package com.hotel.web;

import com.hotel.domain.Room;
import com.hotel.domain.RoomType;
import com.hotel.repository.BookingRepository;
import com.hotel.repository.RoomRepository;
import com.hotel.web.ApiModels.RoomView;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    public RoomController(RoomRepository roomRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public List<RoomView> listRooms(@RequestParam(required = false) RoomType type,
                                    @RequestParam(required = false) java.math.BigDecimal maxPrice,
                                    @RequestParam(required = false, defaultValue = "1") Integer guests,
                                    @RequestParam(required = false) String city,
                                    @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
                                    @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {
        if ((checkIn == null) != (checkOut == null)) {
            throw new IllegalArgumentException("Provide both check-in and check-out dates");
        }
        if (checkIn != null && !checkIn.isBefore(checkOut)) {
            throw new IllegalArgumentException("Check-out must be after check-in");
        }
        if (guests < 1) {
            throw new IllegalArgumentException("Guest count must be at least one");
        }
        return roomRepository.findAllWithAmenities().stream()
                .filter(room -> type == null || room.getRoomType() == type)
                .filter(room -> maxPrice == null || room.calculateBasePrice().compareTo(maxPrice) <= 0)
                .filter(room -> room.getMaxGuests() >= guests)
                .filter(room -> city == null || room.getHotel() != null
                        && room.getHotel().getCity().equalsIgnoreCase(city))
                .filter(Room::isAvailable)
                .filter(room -> checkIn == null || !bookingRepository.existsOverlappingBooking(
                        room.getRoomId(), com.hotel.domain.BookingStatus.CONFIRMED, checkIn, checkOut))
                .map(RoomView::from)
                .toList();
    }

}
