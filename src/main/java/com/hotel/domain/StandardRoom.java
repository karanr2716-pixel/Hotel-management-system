package com.hotel.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;
import java.util.List;

@Entity
@DiscriminatorValue("STANDARD")
public class StandardRoom extends Room {
    protected StandardRoom() {
    }

    public StandardRoom(String roomNumber, BigDecimal pricePerNight, List<String> amenities) {
        super(roomNumber, pricePerNight, amenities);
    }

    @Override
    public BigDecimal calculateBasePrice() {
        return getPricePerNight();
    }

    @Override
    public RoomType getRoomType() {
        return RoomType.STANDARD;
    }
}
