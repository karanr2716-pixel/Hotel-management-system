package com.hotel.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hotelId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false, length = 1200)
    private String description;

    @Column(nullable = false, length = 600)
    private String imageUrl;

    @Column(nullable = false, precision = 2, scale = 1)
    private BigDecimal rating;

    protected Hotel() {
    }

    public Hotel(String name, String city, String description, String imageUrl, BigDecimal rating) {
        this.name = name;
        this.city = city;
        this.description = description;
        this.imageUrl = imageUrl;
        this.rating = rating;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public BigDecimal getRating() {
        return rating;
    }
}
