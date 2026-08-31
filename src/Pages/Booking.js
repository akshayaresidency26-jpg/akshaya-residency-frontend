// import { useEffect, useState } from "react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import "../Css/Booking.css";

// function Booking() {
//   const [rooms, setRooms] = useState([]);

//   const [form, setForm] = useState({
//     roomId: "",
//     guestName: "",
//     email: "",
//     phone: "",
//     guests: 1,
//     checkIn: "",
//     checkOut: "",
//     specialRequest: ""
//   });

//   const [availability, setAvailability] = useState(null);
//   const [message, setMessage] = useState("");

//   // Load rooms from Render backend
//   useEffect(() => {
//     fetch("https://akshaya-residency-backend.onrender.com/api/rooms")
//       .then((response) => {
//         console.log("ROOM API STATUS:", response.status);

//         if (!response.ok) {
//           throw new Error("Failed to load rooms");
//         }

//         return response.json();
//       })
//       .then((data) => {
//         console.log("ROOM DATA:", data);

//         setRooms(data);

//         // Automatically select first room
//         if (data.length > 0) {
//           setForm((old) => ({
//             ...old,
//             roomId: data[0]._id
//           }));
//         }
//       })
//       .catch((error) => {
//         console.error("ROOM API ERROR:", error);
//         setMessage("Unable to load rooms.");
//       });
//   }, []);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });

//     // Clear previous availability when room/date changes
//     if (
//       e.target.name === "roomId" ||
//       e.target.name === "checkIn" ||
//       e.target.name === "checkOut"
//     ) {
//       setAvailability(null);
//       setMessage("");
//     }
//   };

//   const checkAvailability = async () => {
//     if (!form.roomId || !form.checkIn || !form.checkOut) {
//       setMessage("Please select room and dates.");
//       return;
//     }

//     if (form.checkOut <= form.checkIn) {
//       setMessage("Check-out date must be after check-in date.");
//       return;
//     }

//     try {
//       setMessage("Checking availability...");

//       const response = await fetch(
//         `https://akshaya-residency-backend.onrender.com/api/bookings/availability?roomId=${form.roomId}&checkIn=${form.checkIn}&checkOut=${form.checkOut}`
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(data.message || "Unable to check availability.");
//         return;
//       }

//       setAvailability(data);

//       if (data.available) {
//         setMessage(
//           `Room is available. ${data.remainingRooms} room(s) remaining.`
//         );
//       } else {
//         setMessage("Room is not available for these dates.");
//       }
//     } catch (error) {
//       console.error("Availability error:", error);
//       setMessage("Unable to check availability.");
//     }
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   console.log("========== BOOKING START ==========");

//   if (!form.roomId) {
//     setMessage("Please select a room.");
//     return;
//   }

//   if (!form.checkIn || !form.checkOut) {
//     setMessage("Please select check-in and check-out dates.");
//     return;
//   }

//   if (!availability?.available) {
//     setMessage("Please check availability first.");
//     return;
//   }

//   // Show message immediately
//   setMessage("Booking is being submitted...");

//   try {
//     const response = await fetch(
//       "https://akshaya-residency-backend.onrender.com/api/bookings",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       }
//     );

//     console.log("BOOKING STATUS:", response.status);

//     const data = await response.json();

//     console.log("BOOKING RESPONSE:", data);

//     // Backend error
//     if (!response.ok) {
//       setMessage(
//         data.message || "Booking failed."
//       );
//       return;
//     }

//     // SUCCESS
//     const bookingId =
//       data.booking?.bookingId ||
//       data.booking?._id ||
//       "Received";

//     setMessage(
//       `Booking successful! Your Booking ID is ${bookingId}`
//     );

//     // Reset form AFTER success
//     setForm({
//       roomId: rooms[0]?._id || "",
//       guestName: "",
//       email: "",
//       phone: "",
//       guests: 1,
//       checkIn: "",
//       checkOut: "",
//       specialRequest: "",
//     });

//     setAvailability(null);

//     console.log("========== BOOKING SUCCESS ==========");

//   } catch (error) {

//     console.error(
//       "BOOKING ERROR:",
//       error
//     );

//     setMessage(
//       "Unable to submit booking. Please try again."
//     );
//   }
// };

//   return (
//     <>
//       <Navbar />

//       <section className="booking-page">
//         <div className="container">

//           <div className="booking-heading">
//             <h1>Book Your Stay</h1>

//             <p>
//               Check availability and reserve your room at Akshaya Residency.
//             </p>
//           </div>

//           <div className="booking-box">

//             {/* DATE AND ROOM SECTION */}

//             <div className="booking-date-section">

//               <h3>Select Your Dates</h3>

//               <div className="date-grid">

//                 <div>
//                   <label>Check-in</label>

//                   <input
//                     type="date"
//                     name="checkIn"
//                     value={form.checkIn}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label>Check-out</label>

//                   <input
//                     type="date"
//                     name="checkOut"
//                     value={form.checkOut}
//                     onChange={handleChange}
//                   />
//                 </div>

//               </div>

//               {/* ROOM SELECTION */}

//               <div className="room-selection">

//                 <label>Select Room</label>

//                 <select
//                   name="roomId"
//                   value={form.roomId}
//                   onChange={handleChange}
//                   required
//                 >

//                   <option value="">
//                     Select a room
//                   </option>

//                   {rooms.map((room) => (
//                     <option
//                       key={room._id}
//                       value={room._id}
//                     >
//                       {room.name} - ₹{room.price}
//                     </option>
//                   ))}

//                 </select>

//               </div>

//               <button
//                 type="button"
//                 className="availability-btn"
//                 onClick={checkAvailability}
//               >
//                 Check Availability
//               </button>

//               {availability && (
//                 <div
//                   className={
//                     availability.available
//                       ? "available-message"
//                       : "unavailable-message"
//                   }
//                 >
//                   {availability.available
//                     ? `Available — ${availability.remainingRooms} room(s) remaining`
//                     : "Not available for selected dates"}
//                 </div>
//               )}

//             </div>

//             {/* BOOKING FORM */}

//             <div className="booking-form">

//               <h3>Guest Details</h3>

//               <form onSubmit={handleSubmit}>

//                 <input
//                   type="text"
//                   name="guestName"
//                   placeholder="Guest Name*"
//                   value={form.guestName}
//                   onChange={handleChange}
//                   required
//                 />

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email*"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                 />

//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone Number*"
//                   value={form.phone}
//                   onChange={handleChange}
//                   required
//                 />

//                 <input
//                   type="number"
//                   name="guests"
//                   min="1"
//                   placeholder="Number of Guests"
//                   value={form.guests}
//                   onChange={handleChange}
//                   required
//                 />

//                 <textarea
//                   name="specialRequest"
//                   placeholder="Special Request (optional)"
//                   value={form.specialRequest}
//                   onChange={handleChange}
//                   rows="3"
//                 />

//                 <button
//                   type="submit"
//                   className="book-button"
//                 >
//                   Confirm Booking
//                 </button>

//               </form>

//               {message && (
//                 <div className="booking-message">
//                   {message}
//                 </div>
//               )}

//             </div>

//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }

// export default Booking;




import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Css/Booking.css";

// ========================================
// LOCAL BACKEND
// ========================================

const API_URL = "http://localhost:5000";


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
    specialRequest: ""
  });

  const [availability, setAvailability] =
    useState(null);

  const [message, setMessage] =
    useState("");


  // ========================================
  // LOAD ROOMS
  // ========================================

  useEffect(() => {

    fetch(`${API_URL}/api/rooms`)

      .then((response) => {

        console.log(
          "ROOM API STATUS:",
          response.status
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load rooms"
          );
        }

        return response.json();
      })

      .then((data) => {

        console.log(
          "ROOM DATA:",
          data
        );

        setRooms(data);

        if (data.length > 0) {

          setForm((old) => ({
            ...old,
            roomId: data[0]._id
          }));

        }

      })

      .catch((error) => {

        console.error(
          "ROOM API ERROR:",
          error
        );

        setMessage(
          "Unable to load rooms."
        );

      });

  }, []);


  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });


    // Clear old availability
    // when room or dates change

    if (
      e.target.name === "roomId" ||
      e.target.name === "checkIn" ||
      e.target.name === "checkOut"
    ) {

      setAvailability(null);

      setMessage("");

    }

  };


  // ========================================
  // CHECK AVAILABILITY
  // ========================================

  const checkAvailability = async () => {

    if (
      !form.roomId ||
      !form.checkIn ||
      !form.checkOut
    ) {

      setMessage(
        "Please select room and dates."
      );

      return;
    }


    if (
      form.checkOut <= form.checkIn
    ) {

      setMessage(
        "Check-out date must be after check-in date."
      );

      return;
    }


    try {

      setMessage(
        "Checking availability..."
      );


      const response = await fetch(
        `${API_URL}/api/bookings/availability?roomId=${form.roomId}&checkIn=${form.checkIn}&checkOut=${form.checkOut}`
      );


      console.log(
        "AVAILABILITY STATUS:",
        response.status
      );


      const data =
        await response.json();


      console.log(
        "AVAILABILITY DATA:",
        data
      );


      if (!response.ok) {

        setMessage(
          data.message ||
          "Unable to check availability."
        );

        return;
      }


      setAvailability(data);


      if (data.available) {

        setMessage(
          `Room is available. ${data.remainingRooms} room(s) remaining.`
        );

      } else {

        setMessage(
          "Room is not available for these dates."
        );

      }

    } catch (error) {

      console.error(
        "AVAILABILITY ERROR:",
        error
      );

      setMessage(
        "Unable to check availability."
      );

    }

  };


  // ========================================
  // SUBMIT BOOKING
  // ========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    console.log(
      "========== BOOKING START =========="
    );


    // Check room

    if (!form.roomId) {

      setMessage(
        "Please select a room."
      );

      return;
    }


    // Check dates

    if (
      !form.checkIn ||
      !form.checkOut
    ) {

      setMessage(
        "Please select check-in and check-out dates."
      );

      return;
    }


    // Check availability

    if (!availability?.available) {

      setMessage(
        "Please check availability first."
      );

      return;
    }


    // Show immediately

    setMessage(
      "Booking is being submitted..."
    );


    try {

      console.log(
        "SENDING BOOKING TO:",
        `${API_URL}/api/bookings`
      );


      const response = await fetch(
        `${API_URL}/api/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(form)
        }
      );


      console.log(
        "BOOKING STATUS:",
        response.status
      );


      const data =
        await response.json();


      console.log(
        "BOOKING RESPONSE:",
        data
      );


      // ========================================
      // BACKEND ERROR
      // ========================================

      if (!response.ok) {

        setMessage(
          data.message ||
          "Booking failed."
        );

        return;
      }


      // ========================================
      // SUCCESS
      // ========================================

      const bookingId =
        data.booking?.bookingId ||
        data.booking?._id ||
        "Received";


      setMessage(
        `Booking successful! Your Booking ID is ${bookingId}`
      );


      console.log(
        "BOOKING SUCCESS:",
        bookingId
      );


      // ========================================
      // RESET FORM
      // ========================================

      setForm({
        roomId:
          rooms[0]?._id || "",

        guestName: "",

        email: "",

        phone: "",

        guests: 1,

        checkIn: "",

        checkOut: "",

        specialRequest: ""
      });


      setAvailability(null);


      console.log(
        "========== BOOKING SUCCESS =========="
      );


    } catch (error) {

      console.error(
        "BOOKING ERROR:",
        error
      );


      setMessage(
        "Unable to submit booking. Please try again."
      );

    }

  };


  // ========================================
  // PAGE
  // ========================================

  return (
    <>
      <Navbar />


      <section className="booking-page">

        <div className="container">


          {/* HEADING */}

          <div className="booking-heading">

            <h1>
              Book Your Stay
            </h1>

            <p>
              Check availability and reserve
              your room at Akshaya Residency.
            </p>

          </div>


          <div className="booking-box">


            {/* ========================================
                DATE + ROOM SECTION
            ======================================== */}

            <div className="booking-date-section">

              <h3>
                Select Your Dates
              </h3>


              <div className="date-grid">


                {/* CHECK-IN */}

                <div>

                  <label>
                    Check-in
                  </label>

                  <input
                    type="date"
                    name="checkIn"
                    value={form.checkIn}
                    onChange={handleChange}
                  />

                </div>


                {/* CHECK-OUT */}

                <div>

                  <label>
                    Check-out
                  </label>

                  <input
                    type="date"
                    name="checkOut"
                    value={form.checkOut}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* ========================================
                  ROOM SELECTION
              ======================================== */}

              <div className="room-selection">

                <label>
                  Select Room
                </label>


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


              {/* ========================================
                  AVAILABILITY BUTTON
              ======================================== */}

              <button
                type="button"
                className="availability-btn"
                onClick={checkAvailability}
              >

                Check Availability

              </button>


              {/* ========================================
                  AVAILABILITY RESULT
              ======================================== */}

              {availability && (

                <div
                  className={
                    availability.available
                      ? "available-message"
                      : "unavailable-message"
                  }
                >

                  {availability.available

                    ? `Available — ${availability.remainingRooms} room(s) remaining`

                    : "Not available for selected dates"

                  }

                </div>

              )}

            </div>


            {/* ========================================
                GUEST FORM
            ======================================== */}

            <div className="booking-form">

              <h3>
                Guest Details
              </h3>


              <form
                onSubmit={handleSubmit}
              >


                {/* NAME */}

                <input
                  type="text"
                  name="guestName"
                  placeholder="Guest Name*"
                  value={form.guestName}
                  onChange={handleChange}
                  required
                />


                {/* EMAIL */}

                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={form.email}
                  onChange={handleChange}
                  required
                />


                {/* PHONE */}

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number*"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />


                {/* GUESTS */}

                <input
                  type="number"
                  name="guests"
                  min="1"
                  placeholder="Number of Guests"
                  value={form.guests}
                  onChange={handleChange}
                  required
                />


                {/* SPECIAL REQUEST */}

                <textarea
                  name="specialRequest"
                  placeholder="Special Request (optional)"
                  value={form.specialRequest}
                  onChange={handleChange}
                  rows="3"
                />


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="book-button"
                >

                  Confirm Booking

                </button>

              </form>


              {/* ========================================
                  MESSAGE
              ======================================== */}

              {message && (

                <div className="booking-message">

                  {message}

                </div>

              )}

            </div>

          </div>

        </div>

      </section>


      <Footer />

    </>
  );
}


export default Booking;