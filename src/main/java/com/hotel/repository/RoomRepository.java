package com.hotel.repository;

import com.hotel.domain.Room;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import jakarta.persistence.LockModeType;

public interface RoomRepository extends JpaRepository<Room, Long> {
    boolean existsByRoomNumber(String roomNumber);

    long countByHotel_HotelId(Long hotelId);

    @EntityGraph(attributePaths = {"amenities", "hotel"})
    @Query("select room from Room room")
    List<Room> findAllWithAmenities();

    @EntityGraph(attributePaths = {"amenities", "hotel"})
    @Query("select room from Room room where room.roomId = :roomId")
    Optional<Room> findWithAmenitiesByRoomId(@Param("roomId") Long roomId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Room> findLockedByRoomId(Long roomId);
}
