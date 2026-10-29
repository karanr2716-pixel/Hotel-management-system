package com.hotel.service;

import com.hotel.domain.DeluxeRoom;
import com.hotel.domain.DeluxeRoyalRoom;
import com.hotel.domain.ExecutiveSuiteRoom;
import com.hotel.domain.OceanViewRoom;
import com.hotel.domain.Room;
import com.hotel.domain.RoomType;
import com.hotel.domain.StandardRoom;
import com.hotel.domain.SuiteRoom;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class RoomFactory {
    public Room create(RoomType type, String roomNumber, BigDecimal pricePerNight, List<String> amenities) {
        return switch (type) {
            case STANDARD -> new StandardRoom(roomNumber, pricePerNight, amenities);
            case DELUXE -> new DeluxeRoom(roomNumber, pricePerNight, amenities);
            case SUITE -> new SuiteRoom(roomNumber, pricePerNight, amenities);
            case EXECUTIVE_SUITE -> new ExecutiveSuiteRoom(roomNumber, pricePerNight, amenities);
            case DELUXE_ROYAL -> new DeluxeRoyalRoom(roomNumber, pricePerNight, amenities);
            case OCEAN_VIEW -> new OceanViewRoom(roomNumber, pricePerNight, amenities);
        };
    }
}
