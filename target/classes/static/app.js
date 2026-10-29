const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";
const mockHotels = [
  { hotelId: 1, name: "Royal Jaipur Palace", city: "Jaipur", description: "A gracious palace-inspired hideaway with hand-finished suites, intimate courtyards, and warm Rajasthani hospitality.", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80", rating: 4.9, roomCount: 3 },
  { hotelId: 2, name: "Grand Horizon Bay", city: "Mumbai", description: "An elegant bayfront address with city lights, sea breezes, and polished service above the shoreline.", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", rating: 4.8, roomCount: 3 },
  { hotelId: 3, name: "Serene Beach Resort", city: "Goa", description: "A coastal retreat of palm-lined paths, quiet poolside mornings, and sunsets over the Arabian Sea.", imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80", rating: 4.9, roomCount: 3 },
  { hotelId: 4, name: "Metropolitan Crown", city: "Delhi", description: "A refined city sanctuary with contemporary comfort, thoughtful dining, and a private garden retreat.", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80", rating: 4.7, roomCount: 3 },
  { hotelId: 5, name: "Lakeside Heritage Retreat", city: "Udaipur", description: "A serene heritage escape where lake views, warm stone, and unhurried afternoons set the pace.", imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80", rating: 4.9, roomCount: 3 }
];
const mockRooms = [
  ["STANDARD","JAI-101",1,5500,2,["High-speed Wi-Fi","Breakfast included"]],
  ["EXECUTIVE_SUITE","JAI-201",1,10500,3,["High-speed Wi-Fi","Breakfast included","Pool access"]],
  ["DELUXE_ROYAL","JAI-301",1,14500,4,["High-speed Wi-Fi","Pool access","Spa access"]],
  ["STANDARD","MUM-101",2,6500,2,["High-speed Wi-Fi","Breakfast included"]],
  ["EXECUTIVE_SUITE","MUM-201",2,12500,3,["High-speed Wi-Fi","Breakfast included","Pool access"]],
  ["OCEAN_VIEW","MUM-301",2,15000,4,["High-speed Wi-Fi","Pool access","Spa access","Private balcony"]],
  ["STANDARD","GOA-101",3,5000,2,["High-speed Wi-Fi","Breakfast included"]],
  ["EXECUTIVE_SUITE","GOA-201",3,9500,3,["High-speed Wi-Fi","Breakfast included","Pool access"]],
  ["OCEAN_VIEW","GOA-301",3,14000,4,["High-speed Wi-Fi","Pool access","Spa access","Private balcony"]],
  ["STANDARD","DEL-101",4,6000,2,["High-speed Wi-Fi","Breakfast included"]],
  ["EXECUTIVE_SUITE","DEL-201",4,11000,3,["High-speed Wi-Fi","Breakfast included","Pool access"]],
  ["DELUXE_ROYAL","DEL-301",4,14500,4,["High-speed Wi-Fi","Pool access","Spa access"]],
  ["STANDARD","UDA-101",5,7000,2,["High-speed Wi-Fi","Breakfast included"]],
  ["EXECUTIVE_SUITE","UDA-201",5,12000,3,["High-speed Wi-Fi","Breakfast included","Pool access"]],
  ["DELUXE_ROYAL","UDA-301",5,15000,4,["High-speed Wi-Fi","Pool access","Spa access"]]
].map(([type, roomNumber, hotelId, price, maxGuests, amenities], index) => {
  const hotel = mockHotels[hotelId - 1];
  return {
    roomId: index + 1, roomNumber, type, pricePerNight: price, nightlyRate: price,
    maxGuests, status: "AVAILABLE", available: true, amenities, hotelId,
    hotelName: hotel.name, city: hotel.city, rating: hotel.rating, imageUrl: hotel.imageUrl
  };
});
const mockBookings = [
  { bookingId: 1, roomId: 1, roomNumber: "JAI-101", roomType: "STANDARD", checkIn: offsetDate(-1), checkOut: offsetDate(2), status: "CONFIRMED", totalAmount: 16500, guestName: "Aarav Sharma", guestEmail: "aarav.sharma@example.com", guestPhone: "+91 98765 43210", hotelName: "Royal Jaipur Palace", city: "Jaipur" },
  { bookingId: 2, roomId: 5, roomNumber: "MUM-201", roomType: "EXECUTIVE_SUITE", checkIn: offsetDate(-32), checkOut: offsetDate(-29), status: "CANCELLED", totalAmount: 37500, guestName: "Aarav Sharma", guestEmail: "aarav.sharma@example.com", guestPhone: "+91 98765 43210", hotelName: "Grand Horizon Bay", city: "Mumbai" },
  { bookingId: 3, roomId: 9, roomNumber: "GOA-301", roomType: "OCEAN_VIEW", checkIn: offsetDate(-60), checkOut: offsetDate(-58), status: "CONFIRMED", totalAmount: 28000, guestName: "Aarav Sharma", guestEmail: "aarav.sharma@example.com", guestPhone: "+91 98765 43210", hotelName: "Serene Beach Resort", city: "Goa" },
  { bookingId: 4, roomId: 14, roomNumber: "UDA-201", roomType: "EXECUTIVE_SUITE", checkIn: offsetDate(12), checkOut: offsetDate(15), status: "CONFIRMED", totalAmount: 36000, guestName: "Mira Kapoor", guestEmail: "mira.kapoor@example.com", guestPhone: "+91 98111 22334", hotelName: "Lakeside Heritage Retreat", city: "Udaipur" }
];
const state = { hotels: [], rooms: [], selectedRoom: null, backendAvailable: true, nextBookingId: 5 };
const $ = (selector) => document.querySelector(selector);
const money = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(value || 0);
const dateLabel = (value) => new Intl.DateTimeFormat("en-IN", {
  day: "numeric", month: "short", year: "numeric"
}).format(new Date(`${value}T00:00:00`));

async function api(url, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body) headers["Content-Type"] = "application/json";
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(url, { ...options, headers, signal: controller.signal });
    state.backendAvailable = true;
    if (!response.ok) {
      let message = "Something went wrong. Please try again.";
      try {
        const body = await response.json();
        message = body.message || message;
      } catch {
        message = `Request failed (${response.status})`;
      }
      if (response.status === 404 || response.status >= 500) state.backendAvailable = false;
      const error = new Error(message);
      error.status = response.status;
      throw error;
    }
    if (response.status === 204) return null;
    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      state.backendAvailable = false;
      throw new Error("The hotel service took too long to respond.");
    }
    if (error instanceof TypeError) state.backendAvailable = false;
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

function offsetDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function filterMockRooms() {
  const city = $("#city-filter").value.toLowerCase();
  const type = $("#type-filter").value;
  const guests = Number($("#guest-filter").value || 1);
  const checkIn = $("#search-checkin").value;
  const checkOut = $("#search-checkout").value;
  return mockRooms.filter((room) => (!city || room.city.toLowerCase() === city)
    && (!type || room.type === type)
    && room.maxGuests >= guests
    && (!checkIn || !checkOut || !mockBookings.some((booking) => booking.roomId === room.roomId
      && booking.status === "CONFIRMED" && booking.checkIn < checkOut && booking.checkOut > checkIn)));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function roomName(type) {
  return ({
    STANDARD: "Standard",
    DELUXE: "Deluxe",
    SUITE: "Suite",
    EXECUTIVE_SUITE: "Executive Suite",
    DELUXE_ROYAL: "Deluxe Royal",
    OCEAN_VIEW: "Ocean View"
  })[type] || type;
}

function statusPill(status) {
  const value = String(status || "").toLowerCase();
  return `<span class="status-pill ${escapeHtml(value)}">${escapeHtml(value)}</span>`;
}

function hotelCard(hotel) {
  const fallback = escapeHtml(FALLBACK_IMAGE);
  return `<button class="hotel-card group text-left" data-city-card="${escapeHtml(hotel.city)}">
    <div class="hotel-photo relative">
      <img src="${escapeHtml(hotel.imageUrl || FALLBACK_IMAGE)}" onerror="this.onerror=null;this.src='${fallback}';" alt="${escapeHtml(hotel.name)}, ${escapeHtml(hotel.city)}">
      <span class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-ink">✦ ${escapeHtml(hotel.city)}</span>
      <span class="absolute right-4 top-4 rounded-full bg-slate-950/75 px-3 py-1.5 text-[10px] font-semibold text-white">★ ${escapeHtml(hotel.rating)}</span>
    </div>
    <div class="p-5"><div class="flex items-start justify-between gap-3"><h3 class="font-display text-xl">${escapeHtml(hotel.name)}</h3><span class="whitespace-nowrap rounded-full bg-amber-50 px-2.5 py-1 text-[10px] text-amber-800">${hotel.roomCount} rooms</span></div>
      <p class="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">${escapeHtml(hotel.description)}</p>
      <span class="mt-4 inline-flex text-xs font-semibold text-ink group-hover:text-gold">Explore ${escapeHtml(hotel.city)} <span class="ml-2">→</span></span>
    </div>
  </button>`;
}

function roomCard(room) {
  const fallback = escapeHtml(FALLBACK_IMAGE);
  return `<article class="room-card group">
    <div class="room-image-wrap room-photo">
      <img src="${escapeHtml(room.imageUrl || FALLBACK_IMAGE)}" onerror="this.onerror=null;this.src='${fallback}';" alt="${escapeHtml(room.hotelName)} in ${escapeHtml(room.city)}">
      <span class="room-badge">${escapeHtml(room.city)}</span><span class="room-rating">★ ${escapeHtml(room.rating || "4.8")}</span>
      <span class="absolute bottom-3 left-3 rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-bold text-emerald-800">Available</span>
    </div>
    <div class="p-5">
      <p class="text-[10px] font-semibold uppercase tracking-[.15em] text-gold">${escapeHtml(room.city)} · ${roomName(room.type)}</p>
      <h3 class="mt-2 font-display text-xl leading-snug">${escapeHtml(room.hotelName)}</h3>
      <p class="mt-1 text-xs text-slate-500">Room ${escapeHtml(room.roomNumber)} · Sleeps ${escapeHtml(room.maxGuests)}</p>
      <div class="mt-4 flex min-h-8 flex-wrap gap-2">${(room.amenities || []).slice(0, 4).map((item) => `<span class="amenity-pill"><span class="text-gold">✳</span>${escapeHtml(item)}</span>`).join("")}</div>
      <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div><strong class="font-display text-2xl">${money(room.nightlyRate)}</strong><span class="ml-1 text-[10px] text-slate-500">/ night</span></div>
        <button class="rounded-xl bg-amber-600 px-4 py-3 text-xs font-semibold text-white transition hover:bg-amber-700" data-book-room="${room.roomId}">Book room <span class="ml-1">→</span></button>
      </div>
    </div>
  </article>`;
}

function populateCities() {
  const select = $("#city-filter");
  const current = select.value;
  const cities = [...new Set(state.hotels.map((hotel) => hotel.city))];
  select.innerHTML = '<option value="">All destinations</option>' +
    cities.map((city) => `<option value="${escapeHtml(city)}">${escapeHtml(city)}</option>`).join("");
  select.value = current;
}

async function loadHotels() {
  const grid = $("#hotel-grid");
  state.hotels = mockHotels;
  grid.innerHTML = mockHotels.map(hotelCard).join("");
  populateCities();
  if (!state.backendAvailable) return;
  try {
    state.hotels = await api("/api/hotels");
    grid.innerHTML = state.hotels.map(hotelCard).join("") ||
      '<div class="loading-card">New destinations are on their way.</div>';
    populateCities();
  } catch {
    state.hotels = mockHotels;
  }
}

async function loadRooms() {
  const parameters = new URLSearchParams();
  if ($("#type-filter").value) parameters.set("type", $("#type-filter").value);
  if ($("#guest-filter").value) parameters.set("guests", $("#guest-filter").value);
  if ($("#city-filter").value) parameters.set("city", $("#city-filter").value);
  const checkIn = $("#search-checkin").value;
  const checkOut = $("#search-checkout").value;
  if (Boolean(checkIn) !== Boolean(checkOut)) {
    showToast("Choose both check-in and check-out dates.");
    return;
  }
  if (checkIn && checkOut) {
    parameters.set("checkIn", checkIn);
    parameters.set("checkOut", checkOut);
  }
  const grid = $("#room-grid");
  state.rooms = filterMockRooms();
  $("#results-label").textContent = `Demo collection · ${state.rooms.length} curated stays`;
  grid.innerHTML = state.rooms.length
    ? state.rooms.map(roomCard).join("")
    : '<div class="loading-card">No rooms match those dates and preferences. Try a different search.</div>';
  if (!state.backendAvailable) return;
  try {
    state.rooms = await api(`/api/rooms?${parameters.toString()}`);
    $("#results-label").textContent = `${state.rooms.length} curated ${state.rooms.length === 1 ? "stay" : "stays"} to discover`;
    grid.innerHTML = state.rooms.length
      ? state.rooms.map(roomCard).join("")
      : '<div class="loading-card">No rooms match those dates and preferences. Try a different search.</div>';
  } catch {
    state.rooms = filterMockRooms();
  }
}

function renderBookings(bookings, target = $("#bookings-list"), includeCancel = true) {
  target.innerHTML = bookings.length ? bookings.map((booking) => `
    <article class="booking-row">
      <div class="flex min-w-[180px] flex-1 items-center gap-4">
        <div class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-50 text-xl text-gold">✦</div>
        <div><div class="font-display text-lg">${escapeHtml(booking.hotelName)}</div>
          <div class="mt-1 text-xs text-slate-500">${escapeHtml(booking.city)} · ${roomName(booking.roomType)} · ${escapeHtml(booking.roomNumber)} · Booking #${booking.bookingId}</div>
          <div class="mt-1 text-xs text-slate-500">${dateLabel(booking.checkIn)} — ${dateLabel(booking.checkOut)}</div>
        </div>
      </div>
      <div class="text-sm font-semibold">${money(booking.totalAmount)}</div>${statusPill(booking.status)}
      ${includeCancel && booking.status === "CONFIRMED" ? `<button class="table-action" data-cancel-booking="${booking.bookingId}">Cancel booking</button>` : ""}
    </article>`).join("")
    : '<div class="loading-card">No reservations found for those details.</div>';
}

async function lookupBookings(event) {
  event.preventDefault();
  const value = $("#lookup-value").value.trim();
  const message = $("#lookup-message");
  message.textContent = "";
  $("#bookings-list").innerHTML = '<div class="loading-card">Looking up your stay...</div>';
  try {
    let bookings;
    if (state.backendAvailable) {
      bookings = /^\d+$/.test(value)
        ? [await api(`/api/bookings/lookup/${encodeURIComponent(value)}`)]
        : await api(`/api/bookings/lookup?email=${encodeURIComponent(value)}`) || [];
    } else {
      bookings = mockBookings.filter((booking) => /^\d+$/.test(value)
        ? booking.bookingId === Number(value)
        : booking.guestEmail.toLowerCase() === value.toLowerCase());
      message.textContent = "Showing local demo bookings; changes are temporary while the service is offline.";
    }
    renderBookings(bookings);
  } catch (error) {
    const bookings = mockBookings.filter((booking) => /^\d+$/.test(value)
      ? booking.bookingId === Number(value)
      : booking.guestEmail.toLowerCase() === value.toLowerCase());
    renderBookings(bookings);
    message.textContent = `Showing local demo bookings because the service is unavailable. ${error.message}`;
  }
}

function futureDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function setDateMinimums() {
  const today = futureDate(0);
  ["search-checkin", "search-checkout", "booking-checkin", "booking-checkout"].forEach((id) => {
    $(`#${id}`).min = today;
  });
  $("#search-checkin").value = futureDate(1);
  $("#search-checkout").value = futureDate(2);
}

function showBookingDialog(room) {
  if (!room) return;
  state.selectedRoom = room;
  $("#modal-room-name").textContent = `${room.hotelName} · ${room.city} · ${roomName(room.type)} · ${money(room.nightlyRate)} / night`;
  $("#booking-checkin").value = $("#search-checkin").value || futureDate(1);
  $("#booking-checkout").value = $("#search-checkout").value || futureDate(2);
  $("#quote-total").textContent = "Choose your dates";
  $("#booking-error").textContent = "";
  $("#booking-dialog").showModal();
  updateQuote();
}

let quoteRequest = 0;
async function updateQuote() {
  const checkIn = $("#booking-checkin").value;
  const checkOut = $("#booking-checkout").value;
  if (!state.selectedRoom || !checkIn || !checkOut || checkIn >= checkOut) {
    $("#quote-total").textContent = "Choose valid dates";
    return;
  }
  const request = ++quoteRequest;
  try {
    const total = state.backendAvailable
      ? await api(`/api/bookings/quote?roomId=${state.selectedRoom.roomId}&checkIn=${checkIn}&checkOut=${checkOut}`)
      : state.selectedRoom.nightlyRate * ((new Date(`${checkOut}T00:00:00`) - new Date(`${checkIn}T00:00:00`)) / 86400000);
    if (request === quoteRequest) $("#quote-total").textContent = money(total);
  } catch (error) {
    if (request === quoteRequest) {
      const nights = (new Date(`${checkOut}T00:00:00`) - new Date(`${checkIn}T00:00:00`)) / 86400000;
      $("#quote-total").textContent = money(state.selectedRoom.nightlyRate * nights);
      $("#booking-error").textContent = `Using a local demo quote. ${error.message}`;
    }
  }
}

async function submitBooking(event) {
  event.preventDefault();
  $("#booking-error").textContent = "";
  let payload;
  try {
    payload = {
      roomId: state.selectedRoom.roomId,
      checkIn: $("#booking-checkin").value,
      checkOut: $("#booking-checkout").value,
      guestName: $("#guest-name").value.trim(),
      guestEmail: $("#guest-email").value.trim(),
      guestPhone: $("#guest-phone").value.trim()
    };
    const booking = state.backendAvailable
      ? await api("/api/bookings", { method: "POST", body: JSON.stringify(payload) })
      : createMockBooking(payload);
    await finishBooking(booking);
  } catch (error) {
    if (!state.backendAvailable && payload) {
      await finishBooking(createMockBooking(payload));
      showToast("Booking saved to the local demo. Connect the hotel service to save it permanently.");
      return;
    }
    $("#booking-error").textContent = error.message;
  }
}

async function finishBooking(booking) {
  $("#booking-dialog").close();
  $("#booking-form").reset();
  $("#lookup-value").value = booking.guestEmail;
  await lookupBookings(new Event("submit", { cancelable: true }));
  showToast(`Booking #${booking.bookingId} confirmed. We look forward to welcoming you.`);
  await loadRooms();
}

async function cancelBooking(bookingId, target) {
  if (!window.confirm(`Cancel booking #${bookingId}?`)) return;
  try {
    if (state.backendAvailable) await api(`/api/bookings/${bookingId}`, { method: "DELETE" });
    else cancelMockBooking(bookingId);
    showToast(`Booking #${bookingId} cancelled.`);
    if (target === "owner") await loadOwnerLog();
    else await lookupBookings(new Event("submit", { cancelable: true }));
    await loadRooms();
  } catch (error) {
    showToast(error.message);
  }
}

async function loadOwnerLog() {
  const rows = $("#owner-bookings");
  const message = $("#owner-message");
  message.textContent = "";
  rows.innerHTML = '<tr><td colspan="7">Loading bookings...</td></tr>';
  try {
    const bookings = state.backendAvailable ? await api("/api/bookings") : mockBookings;
    renderOwnerBookings(bookings, rows);
    if (!state.backendAvailable) message.textContent = "Showing local demo bookings; changes are temporary while the service is offline.";
  } catch (error) {
    renderOwnerBookings(mockBookings, rows);
    message.textContent = `Showing local demo bookings because the service is unavailable. ${error.message}`;
  }
}

function renderOwnerBookings(bookings, rows) {
  const message = $("#owner-message");
  const revenue = bookings.filter((booking) => booking.status !== "CANCELLED")
    .reduce((sum, booking) => sum + Number(booking.totalAmount), 0);
  const confirmed = bookings.filter((booking) => booking.status === "CONFIRMED").length;
  $("#owner-metrics").innerHTML = [
    ["TOTAL BOOKINGS", bookings.length],
    ["CONFIRMED", confirmed],
    ["BOOKED VALUE", money(revenue)]
  ].map(([label, value]) => `<div class="metric-card"><span>${label}</span><strong>${value}</strong></div>`).join("");
  rows.innerHTML = bookings.length ? bookings.map((booking) => `<tr>
    <td><strong>${escapeHtml(booking.guestName)}</strong><span class="mt-1 block text-[10px] text-slate-400">#${booking.bookingId}</span></td>
    <td>${escapeHtml(booking.guestEmail)}<span class="mt-1 block text-[10px] text-slate-400">${escapeHtml(booking.guestPhone)}</span></td>
    <td>${escapeHtml(booking.hotelName)}<span class="mt-1 block text-[10px] text-slate-400">${escapeHtml(booking.roomNumber)} · ${roomName(booking.roomType)}</span></td>
    <td>${dateLabel(booking.checkIn)}<span class="mt-1 block text-[10px] text-slate-400">${dateLabel(booking.checkOut)}</span></td>
    <td>${money(booking.totalAmount)}</td><td>${statusPill(booking.status)}</td>
    <td>${booking.status === "CONFIRMED" ? `<button class="table-action" data-owner-cancel="${booking.bookingId}">Cancel</button>` : "—"}</td></tr>`).join("")
    : '<tr><td colspan="7">No bookings found.</td></tr>';
  if (state.backendAvailable) message.textContent = "";
}

function createMockBooking(payload) {
  const room = mockRooms.find((item) => item.roomId === Number(payload.roomId));
  const nights = (new Date(`${payload.checkOut}T00:00:00`) - new Date(`${payload.checkIn}T00:00:00`)) / 86400000;
  const booking = {
    bookingId: state.nextBookingId++, roomId: room.roomId, roomNumber: room.roomNumber,
    roomType: room.type, checkIn: payload.checkIn, checkOut: payload.checkOut,
    status: "CONFIRMED", totalAmount: room.nightlyRate * nights,
    guestName: payload.guestName, guestEmail: payload.guestEmail, guestPhone: payload.guestPhone,
    hotelName: room.hotelName, city: room.city
  };
  mockBookings.unshift(booking);
  return booking;
}

function cancelMockBooking(bookingId) {
  const booking = mockBookings.find((item) => item.bookingId === Number(bookingId));
  if (!booking || booking.status !== "CONFIRMED") throw new Error("Only confirmed bookings can be cancelled.");
  booking.status = "CANCELLED";
}

document.addEventListener("click", (event) => {
  const bookingButton = event.target.closest("[data-book-room]");
  if (bookingButton) {
    const room = state.rooms.find((item) => item.roomId === Number(bookingButton.dataset.bookRoom));
    showBookingDialog(room);
    return;
  }
  const cityButton = event.target.closest("[data-city-card]");
  if (cityButton) {
    $("#city-filter").value = cityButton.dataset.cityCard;
    loadRooms();
    $("#rooms").scrollIntoView({ behavior: "smooth" });
    return;
  }
  const cancelButton = event.target.closest("[data-cancel-booking]");
  if (cancelButton) cancelBooking(cancelButton.dataset.cancelBooking, "lookup");
  const ownerCancelButton = event.target.closest("[data-owner-cancel]");
  if (ownerCancelButton) cancelBooking(ownerCancelButton.dataset.ownerCancel, "owner");
});

$("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  loadRooms();
  $("#rooms").scrollIntoView({ behavior: "smooth" });
});
$("#lookup-form").addEventListener("submit", lookupBookings);
$("#booking-form").addEventListener("submit", submitBooking);
$("#booking-checkin").addEventListener("change", updateQuote);
$("#booking-checkout").addEventListener("change", updateQuote);
$("#owner-open").addEventListener("click", async () => {
  $("#owner-dialog").showModal();
  await loadOwnerLog();
});
$("#menu-toggle").addEventListener("click", () => $("#mobile-nav").classList.toggle("hidden"));
$("#mobile-nav").addEventListener("click", (event) => {
  if (event.target.closest("a")) $("#mobile-nav").classList.add("hidden");
});

setDateMinimums();
loadHotels();
loadRooms();
