package com.hotel.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;
import java.util.List;

@Entity
@DiscriminatorValue("SUITE")
public class SuiteRoom extends Room {
    protected SuiteRoom() {
    }

    public SuiteRoom(String roomNumber, BigDecimal pricePerNight, List<String> amenities) {
        super(roomNumber, pricePerNight, amenities);
    }

    @Override
    public BigDecimal calculateBasePrice() {
        return getPricePerNight().multiply(new BigDecimal("1.35"));
    }

    @Override
    public RoomType getRoomType() {
        return RoomType.SUITE;
    }
}
