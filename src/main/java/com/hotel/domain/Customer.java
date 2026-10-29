package com.hotel.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("CUSTOMER")
public class Customer extends User {
    @OneToMany(mappedBy = "customer")
    private List<Booking> bookingHistory = new ArrayList<>();

    protected Customer() {
    }

    public Customer(String name, String email, String phone) {
        super(name, email, phone);
    }

    public Booking bookRoom(Room room, LocalDate checkIn, LocalDate checkOut) {
        Booking booking = new Booking(this, room, checkIn, checkOut);
        bookingHistory.add(booking);
        return booking;
    }

    public void cancelBooking(Booking booking) {
        if (!booking.getCustomer().getId().equals(getId())) {
            throw new IllegalArgumentException("Customers can only cancel their own bookings");
        }
        booking.cancel();
    }

    public List<Booking> getBookingHistory() {
        return List.copyOf(bookingHistory);
    }

    public void registerBooking(Booking booking) {
        if (booking.getCustomer() != this) {
            throw new IllegalArgumentException("Booking belongs to another customer");
        }
        bookingHistory.add(booking);
    }

    @Override
    public String getDashboardView() {
        return "customer-dashboard";
    }

    @Override
    public Role getRole() {
        return Role.CUSTOMER;
    }
}
