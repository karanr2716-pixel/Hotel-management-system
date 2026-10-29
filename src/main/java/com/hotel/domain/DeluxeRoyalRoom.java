package com.hotel.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;
import java.util.List;

@Entity
@DiscriminatorValue("DELUXE_ROYAL")
public class DeluxeRoyalRoom extends Room {
    protected DeluxeRoyalRoom() {
    }

    public DeluxeRoyalRoom(String roomNumber, BigDecimal pricePerNight, List<String> amenities) {
        super(roomNumber, pricePerNight, amenities);
    }

    @Override
    public BigDecimal calculateBasePrice() {
        return getPricePerNight();
    }

    @Override
    public RoomType getRoomType() {
        return RoomType.DELUXE_ROYAL;
    }
}
