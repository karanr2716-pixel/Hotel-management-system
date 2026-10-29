package com.hotel.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;
import java.util.List;

@Entity
@DiscriminatorValue("EXECUTIVE_SUITE")
public class ExecutiveSuiteRoom extends Room {
    protected ExecutiveSuiteRoom() {
    }

    public ExecutiveSuiteRoom(String roomNumber, BigDecimal pricePerNight, List<String> amenities) {
        super(roomNumber, pricePerNight, amenities);
    }

    @Override
    public BigDecimal calculateBasePrice() {
        return getPricePerNight();
    }

    @Override
    public RoomType getRoomType() {
        return RoomType.EXECUTIVE_SUITE;
    }
}
