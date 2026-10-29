package com.hotel.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.util.List;

@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends User {
    protected Admin() {
    }

    public Admin(String name, String email, String phone) {
        super(name, email, phone);
    }

    public List<Customer> viewAllCustomers(List<Customer> customers) {
        return List.copyOf(customers);
    }

    public Room addRoom(Room room) {
        return room;
    }

    public void updateRoomStatus(Room room, RoomStatus status) {
        room.setStatus(status);
    }

    public void manageBooking(Booking booking, BookingStatus status) {
        if (status == BookingStatus.CANCELLED) {
            booking.cancel();
        } else {
            booking.setStatus(status);
        }
    }

    @Override
    public String getDashboardView() {
        return "admin-dashboard";
    }

    @Override
    public Role getRole() {
        return Role.ADMIN;
    }
}
