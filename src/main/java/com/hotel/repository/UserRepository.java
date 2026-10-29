package com.hotel.repository;

import com.hotel.domain.Customer;
import com.hotel.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email);

    @Query("select customer from Customer customer where lower(customer.email) = lower(:email)")
    Optional<Customer> findCustomerByEmailIgnoreCase(@Param("email") String email);

    @EntityGraph(attributePaths = {"bookingHistory", "bookingHistory.room", "bookingHistory.room.hotel"})
    @Query("select distinct customer from Customer customer")
    List<Customer> findAllCustomers();
}
