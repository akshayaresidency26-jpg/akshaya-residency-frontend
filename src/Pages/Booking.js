import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Css/Booking.css";

// LIVE BACKEND
const API_URL = "https://akshaya-residency-backend-1.onrender.com";

function Booking() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomId: "",
    guestName: "",
    email: "",
    phone: "",
    guests: 1,
    checkIn: "",
    checkOut: "",
    specialRequest: "",
  });

  const [availability, setAvailability] = useState(null);
  const [message, setMessage] = useState("");

  // Load rooms
  useEffect(() => {
    fetch(`${API_URL}/api/rooms`)
      .then((response) => {
        console.log("ROOM API STATUS:", response.status);

        if (!response.ok) {
          throw new Error("Failed to load rooms");
        }

        return response.json();
      })
      .then((data) => {
        console.log("ROOM DATA:", data);

        setRooms(data);

        if (data.length > 0) {
          setForm((old) => ({
            ...old,
            roomId: data[0]._id,
          }));
        }
      })
      .catch((error) => {
        console.error("ROOM API ERROR:", error);
        setMessage("Unable to load rooms.");
      });
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (
      e.target.name === "roomId" ||
      e.target.name === "checkIn" ||
      e.target.name === "checkOut"
    ) {
      setAvailability(null);
      setMessage("");
    }
  };

  // Check Availability
  const checkAvailability = async () => {
    if (!form.roomId || !form.checkIn || !form.checkOut) {
      setMessage("Please select room and dates.");
      return;
    }

    if (form.checkOut <= form.checkIn) {
      setMessage("Check-out date must be after check-in date.");
      return;
    }

    try {
      setMessage("Checking availability...");

      const response = await fetch(
        `${API_URL}/api/bookings/availability?roomId=${form.roomId}&checkIn=${form.checkIn}&checkOut=${form.checkOut}`
      );

      console.log("AVAILABILITY STATUS:", response.status);

      const data = await response.json();

      console.log("AVAILABILITY DATA:", data);

      if (!response.ok) {
        setMessage(
          data.message || "Unable to check availability."
        );
        return;
      }

      setAvailability(data);

      if (data.available) {
        setMessage(
          `Room is available. ${data.remainingRooms} room(s) remaining.`
        );
      } else {
        setMessage("Room is not available for these dates.");
      }
    } catch (error) {
      console.error("AVAILABILITY ERROR:", error);
      setMessage("Unable to check availability.");
    }
  };

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("========== BOOKING START ==========");

    if (!form.roomId) {
      setMessage("Please select a room.");
      return;
    }

    if (!form.checkIn || !form.checkOut) {
      setMessage("Please select check-in and check-out dates.");
      return;
    }

    if (form.checkOut <= form.checkIn) {
      setMessage("Check-out date must be after check-in date.");
      return;
    }

    if (!availability?.available) {
      setMessage("Please check availability first.");
      return;
    }

    const selectedRoom = rooms.find(
      (room) => room._id === form.roomId
    );

    if (!selectedRoom) {
      setMessage("Selected room could not be found.");
      return;
    }

    // Send booking details without ID-proof upload.
    // FormData is retained for compatibility with the existing backend.
    const bookingData = {
      roomId: form.roomId,
      name: form.guestName,
      email: form.email,
      phone: form.phone,
      roomType:
        selectedRoom.name || selectedRoom.roomType || "",
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: Number(form.guests),
      message: form.specialRequest || "",
    };

    console.log("BOOKING FORM DATA READY");

    setMessage("Booking is being submitted...");

    try {
      console.log("SENDING BOOKING TO:", `${API_URL}/api/bookings`);

      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      console.log("BOOKING STATUS:", response.status);

      const data = await response.json();

      console.log("BOOKING RESPONSE:", data);

      if (!response.ok) {
        setMessage(data.message || "Booking failed.");
        return;
      }

      const bookingId =
        data.booking?.bookingId ||
        data.booking?._id ||
        "Received";

      setMessage(
        `Booking successful! Your Booking ID is ${bookingId}. Payment instructions have been sent to your email.`
      );

      console.log("BOOKING SUCCESS:", bookingId);

      setForm({
        roomId: rooms[0]?._id || "",
        guestName: "",
        email: "",
        phone: "",
        guests: 1,
        checkIn: "",
        checkOut: "",
        specialRequest: "",
      });

      setAvailability(null);

      console.log("========== BOOKING SUCCESS ==========");
    } catch (error) {
      console.error("BOOKING ERROR:", error);

      setMessage(
        "Unable to submit booking. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="booking-page">
        <section className="booking-hero">
          <div className="booking-hero-overlay"></div>

          <div className="container">
            <div className="booking-hero-content">
              <span>
                AKSHAYA RESIDENCY · COURTALLAM
              </span>

              <h1>
                Book Your <em>Stay</em>
              </h1>

              <p>
                Choose your dates, select your room,
                and plan a comfortable stay in Courtallam.
              </p>

              <div className="booking-hero-line"></div>
            </div>
          </div>
        </section>

        {/* Booking Content */}
        <section className="booking-content">
          <div className="container">
            {/* Heading */}
            <div className="booking-heading">
              <span className="booking-heading-small">
                RESERVATION
              </span>

              <h2>
                Plan Your <em>Stay</em>
              </h2>

              <p>
                Check room availability and provide
                your details to complete your reservation.
              </p>
            </div>

            {/* Booking Box */}
            <div className="booking-box">
              <div className="booking-date-section">
                <div className="booking-section-number">
                  01
                </div>

                <span className="booking-section-label">
                  YOUR RESERVATION
                </span>

                <h3>Select Your Dates</h3>

                <p className="booking-section-description">
                  Choose your check-in and check-out
                  dates to see room availability.
                </p>

                <div className="date-grid">
                  <div className="booking-field">
                    <label>Check-in</label>

                    <input
                      type="date"
                      name="checkIn"
                      value={form.checkIn}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label>Check-out</label>

                    <input
                      type="date"
                      name="checkOut"
                      value={form.checkOut}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Room */}
                <div className="room-selection">
                  <label>Select Room</label>

                  <select
                    name="roomId"
                    value={form.roomId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select a room
                    </option>

                    {rooms.map((room) => (
                      <option
                        key={room._id}
                        value={room._id}
                      >
                        {room.name} - ₹{room.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Availability */}
                <button
                  type="button"
                  className="availability-btn"
                  onClick={checkAvailability}
                >
                  <span>Check Availability</span>
                  <b>→</b>
                </button>

                {/* Availability Result */}
                {availability && (
                  <div
                    className={
                      availability.available
                        ? "available-message"
                        : "unavailable-message"
                    }
                  >
                    <span>
                      {availability.available ? "✓" : "!"}
                    </span>

                    <div>
                      {availability.available
                        ? `Available — ${availability.remainingRooms} room(s) remaining`
                        : "Not available for selected dates"}
                    </div>
                  </div>
                )}
              </div>

              <div className="booking-form">
                <div className="booking-section-number">
                  02
                </div>

                <span className="booking-section-label">
                  YOUR INFORMATION
                </span>

                <h3>Guest Details</h3>

                <p className="booking-section-description">
                  Please provide your details so we
                  can confirm your reservation.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="booking-input-group">
                    <label>Guest Name</label>

                    <input
                      type="text"
                      name="guestName"
                      placeholder="Enter your full name"
                      value={form.guestName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="booking-input-group">
                    <label>Email Address</label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="booking-input-group">
                    <label>Phone Number</label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Guests */}
                  <div className="booking-input-group">
                    <label>Number of Guests</label>

                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      required
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  {/* Special Request */}
                  <div className="booking-input-group">
                    <label>Special Request</label>

                    <textarea
                      name="specialRequest"
                      placeholder="Anything you would like us to know? (optional)"
                      value={form.specialRequest}
                      onChange={handleChange}
                      rows="3"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="book-button"
                  >
                    <span>Confirm Booking</span>
                    <b>→</b>
                  </button>
                </form>

                {message && (
                  <div className="booking-message">
                    {message}
                  </div>
                )}
              </div>
            </div>

            <div className="booking-note">
              <span>✦</span>

              <p>
                Your booking details are handled securely.
                After successful submission, payment
                instructions will be sent to your email.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Booking;
