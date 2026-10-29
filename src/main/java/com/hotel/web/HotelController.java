package com.hotel.web;

import com.hotel.repository.HotelRepository;
import com.hotel.repository.RoomRepository;
import com.hotel.web.ApiModels.HotelView;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {
    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    public HotelController(HotelRepository hotelRepository, RoomRepository roomRepository) {
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }

    @GetMapping
    public List<HotelView> listHotels() {
        return hotelRepository.findAll().stream()
                .map(hotel -> HotelView.from(hotel, roomRepository.countByHotel_HotelId(hotel.getHotelId())))
                .toList();
    }
}
