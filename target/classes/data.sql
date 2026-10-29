INSERT INTO hotels (name, city, description, image_url, rating)
SELECT 'Royal Jaipur Palace', 'Jaipur',
       'A gracious palace-inspired hideaway with hand-finished suites, intimate courtyards, and warm Rajasthani hospitality.',
       'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', 4.9
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'Royal Jaipur Palace');

INSERT INTO hotels (name, city, description, image_url, rating)
SELECT 'Grand Horizon Bay', 'Mumbai',
       'An elegant bayfront address with city lights, sea breezes, and polished service above the shoreline.',
       'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', 4.8
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'Grand Horizon Bay');

INSERT INTO hotels (name, city, description, image_url, rating)
SELECT 'Serene Beach Resort', 'Goa',
       'A coastal retreat of palm-lined paths, quiet poolside mornings, and sunsets over the Arabian Sea.',
       'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80', 4.9
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'Serene Beach Resort');

INSERT INTO hotels (name, city, description, image_url, rating)
SELECT 'Metropolitan Crown', 'Delhi',
       'A refined city sanctuary with contemporary comfort, thoughtful dining, and a private garden retreat.',
       'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80', 4.7
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'Metropolitan Crown');

INSERT INTO hotels (name, city, description, image_url, rating)
SELECT 'Lakeside Heritage Retreat', 'Udaipur',
       'A serene heritage escape where lake views, warm stone, and unhurried afternoons set the pace.',
       'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80', 4.9
WHERE NOT EXISTS (SELECT 1 FROM hotels WHERE name = 'Lakeside Heritage Retreat');

INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'STANDARD', 'JAI-101', hotel_id, 5500, 'AVAILABLE' FROM hotels WHERE name = 'Royal Jaipur Palace'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'JAI-101');
INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'EXECUTIVE_SUITE', 'JAI-201', hotel_id, 10500, 'AVAILABLE' FROM hotels WHERE name = 'Royal Jaipur Palace'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'JAI-201');
INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'DELUXE_ROYAL', 'JAI-301', hotel_id, 14500, 'AVAILABLE' FROM hotels WHERE name = 'Royal Jaipur Palace'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'JAI-301');

INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'STANDARD', 'MUM-101', hotel_id, 6500, 'AVAILABLE' FROM hotels WHERE name = 'Grand Horizon Bay'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'MUM-101');
INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'EXECUTIVE_SUITE', 'MUM-201', hotel_id, 12500, 'AVAILABLE' FROM hotels WHERE name = 'Grand Horizon Bay'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'MUM-201');
INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'OCEAN_VIEW', 'MUM-301', hotel_id, 15000, 'AVAILABLE' FROM hotels WHERE name = 'Grand Horizon Bay'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'MUM-301');

INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'STANDARD', 'GOA-101', hotel_id, 5000, 'AVAILABLE' FROM hotels WHERE name = 'Serene Beach Resort'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'GOA-101');
INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'EXECUTIVE_SUITE', 'GOA-201', hotel_id, 9500, 'AVAILABLE' FROM hotels WHERE name = 'Serene Beach Resort'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'GOA-201');
INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'OCEAN_VIEW', 'GOA-301', hotel_id, 14000, 'AVAILABLE' FROM hotels WHERE name = 'Serene Beach Resort'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'GOA-301');

INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'STANDARD', 'DEL-101', hotel_id, 6000, 'AVAILABLE' FROM hotels WHERE name = 'Metropolitan Crown'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'DEL-101');
INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'EXECUTIVE_SUITE', 'DEL-201', hotel_id, 11000, 'AVAILABLE' FROM hotels WHERE name = 'Metropolitan Crown'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'DEL-201');
INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'DELUXE_ROYAL', 'DEL-301', hotel_id, 14500, 'AVAILABLE' FROM hotels WHERE name = 'Metropolitan Crown'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'DEL-301');

INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'STANDARD', 'UDA-101', hotel_id, 7000, 'AVAILABLE' FROM hotels WHERE name = 'Lakeside Heritage Retreat'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'UDA-101');
INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'EXECUTIVE_SUITE', 'UDA-201', hotel_id, 12000, 'AVAILABLE' FROM hotels WHERE name = 'Lakeside Heritage Retreat'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'UDA-201');
INSERT INTO rooms (room_type, room_number, hotel_id, price_per_night, status)
SELECT 'DELUXE_ROYAL', 'UDA-301', hotel_id, 15000, 'AVAILABLE' FROM hotels WHERE name = 'Lakeside Heritage Retreat'
AND NOT EXISTS (SELECT 1 FROM rooms WHERE room_number = 'UDA-301');

UPDATE rooms SET max_guests = 2 WHERE room_type = 'STANDARD';
UPDATE rooms SET max_guests = 3 WHERE room_type = 'EXECUTIVE_SUITE';
UPDATE rooms SET max_guests = 4 WHERE room_type IN ('DELUXE_ROYAL', 'OCEAN_VIEW', 'DELUXE', 'SUITE');

INSERT INTO room_amenities (room_id, amenity)
SELECT room_id, 'High-speed Wi-Fi' FROM rooms r
WHERE NOT EXISTS (SELECT 1 FROM room_amenities a WHERE a.room_id = r.room_id AND a.amenity = 'High-speed Wi-Fi');
INSERT INTO room_amenities (room_id, amenity)
SELECT room_id, 'Breakfast included' FROM rooms r
WHERE room_type IN ('STANDARD', 'EXECUTIVE_SUITE')
AND NOT EXISTS (SELECT 1 FROM room_amenities a WHERE a.room_id = r.room_id AND a.amenity = 'Breakfast included');
INSERT INTO room_amenities (room_id, amenity)
SELECT room_id, 'Pool access' FROM rooms r
WHERE room_type IN ('EXECUTIVE_SUITE', 'DELUXE_ROYAL', 'OCEAN_VIEW')
AND NOT EXISTS (SELECT 1 FROM room_amenities a WHERE a.room_id = r.room_id AND a.amenity = 'Pool access');
INSERT INTO room_amenities (room_id, amenity)
SELECT room_id, 'Spa access' FROM rooms r
WHERE room_type IN ('DELUXE_ROYAL', 'OCEAN_VIEW')
AND NOT EXISTS (SELECT 1 FROM room_amenities a WHERE a.room_id = r.room_id AND a.amenity = 'Spa access');
INSERT INTO room_amenities (room_id, amenity)
SELECT room_id, 'Private balcony' FROM rooms r
WHERE room_type = 'OCEAN_VIEW'
AND NOT EXISTS (SELECT 1 FROM room_amenities a WHERE a.room_id = r.room_id AND a.amenity = 'Private balcony');

INSERT INTO users (user_type, name, email, phone)
SELECT 'CUSTOMER', 'Aarav Sharma', 'aarav.sharma@example.com', '+91 98765 43210'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'aarav.sharma@example.com');
INSERT INTO users (user_type, name, email, phone)
SELECT 'CUSTOMER', 'Mira Kapoor', 'mira@example.com', '+91 98111 22334'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'mira@example.com');
INSERT INTO users (user_type, name, email, phone)
SELECT 'CUSTOMER', 'Kabir Mehta', 'kabir@example.com', '+91 98220 11223'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'kabir@example.com');

INSERT INTO bookings (customer_id, room_id, check_in, check_out, status, nightly_rate, total_amount)
SELECT u.id, r.room_id, CURRENT_DATE - 1, CURRENT_DATE + 2, 'CONFIRMED', r.price_per_night, r.price_per_night * 3
FROM users u CROSS JOIN rooms r
WHERE u.email = 'aarav.sharma@example.com' AND r.room_number = 'JAI-101'
AND NOT EXISTS (SELECT 1 FROM bookings WHERE room_id = r.room_id AND customer_id = u.id);

INSERT INTO bookings (customer_id, room_id, check_in, check_out, status, nightly_rate, total_amount)
SELECT u.id, r.room_id, CURRENT_DATE - 32, CURRENT_DATE - 29, 'CANCELLED', r.price_per_night, r.price_per_night * 3
FROM users u CROSS JOIN rooms r
WHERE u.email = 'aarav.sharma@example.com' AND r.room_number = 'MUM-201'
AND NOT EXISTS (SELECT 1 FROM bookings WHERE room_id = r.room_id AND customer_id = u.id);

INSERT INTO bookings (customer_id, room_id, check_in, check_out, status, nightly_rate, total_amount)
SELECT u.id, r.room_id, CURRENT_DATE - 60, CURRENT_DATE - 58, 'CONFIRMED', r.price_per_night, r.price_per_night * 2
FROM users u CROSS JOIN rooms r
WHERE u.email = 'aarav.sharma@example.com' AND r.room_number = 'GOA-301'
AND NOT EXISTS (SELECT 1 FROM bookings WHERE room_id = r.room_id AND customer_id = u.id);

INSERT INTO bookings (customer_id, room_id, check_in, check_out, status, nightly_rate, total_amount)
SELECT u.id, r.room_id, CURRENT_DATE + 12, CURRENT_DATE + 15, 'CONFIRMED', r.price_per_night, r.price_per_night * 3
FROM users u CROSS JOIN rooms r
WHERE u.email = 'mira@example.com' AND r.room_number = 'UDA-201'
AND NOT EXISTS (SELECT 1 FROM bookings WHERE room_id = r.room_id AND customer_id = u.id);
