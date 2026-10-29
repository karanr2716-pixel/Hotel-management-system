package com.hotel.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;
import java.util.List;

@Entity
@DiscriminatorValue("DELUXE")
public class DeluxeRoom extends Room {
    protected DeluxeRoom() {
    }

    public DeluxeRoom(String roomNumber, BigDecimal pricePerNight, List<String> amenities) {
        super(roomNumber, pricePerNight, amenities);
    }

    @Override
    public BigDecimal calculateBasePrice() {
        return getPricePerNight().multiply(new BigDecimal("1.15"));
    }

    @Override
    public RoomType getRoomType() {
        return RoomType.DELUXE;
    }
}
