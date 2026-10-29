package com.hotel.repository;

import com.hotel.domain.Booking;
import com.hotel.domain.BookingStatus;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsByRoom_RoomId(Long roomId);

    @EntityGraph(attributePaths = {"customer", "room", "room.hotel"})
    List<Booking> findAllByCustomerEmailOrderByCheckInDesc(String email);

    @EntityGraph(attributePaths = {"customer", "room", "room.hotel"})
    List<Booking> findAllByOrderByCheckInDesc();

    @EntityGraph(attributePaths = {"customer", "room", "room.hotel"})
    @Query("select booking from Booking booking where booking.bookingId = :bookingId")
    Optional<Booking> findWithDetailsById(@Param("bookingId") Long bookingId);

    @EntityGraph(attributePaths = {"customer", "room", "room.hotel"})
    List<Booking> findAllByCustomerEmailIgnoreCaseOrderByCheckInDesc(String email);

    @Query("""
        select count(b) > 0 from Booking b
        where b.room.roomId = :roomId and b.status = :status
          and b.checkIn < :checkOut and b.checkOut > :checkIn
        """)
    boolean existsOverlappingBooking(@Param("roomId") Long roomId,
                                     @Param("status") BookingStatus status,
                                     @Param("checkIn") LocalDate checkIn,
                                     @Param("checkOut") LocalDate checkOut);
}
