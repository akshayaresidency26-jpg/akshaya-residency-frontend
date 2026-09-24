import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import "./Admin.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";


function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }
  );
}


function dateKey(date) {
  const d = new Date(date);

  return d.toISOString().split("T")[0];
}


function AdminDashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [monthDate, setMonthDate] = useState(
    new Date()
  );


  const token =
    localStorage.getItem("adminToken");


  /*
    FETCH BOOKINGS
  */
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const currentToken =
        localStorage.getItem("adminToken");

      if (!currentToken) {
        navigate("/admin/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/bookings`,
        {
          headers: {
            Authorization:
              `Bearer ${currentToken}`,
          },
        }
      );


      if (response.status === 401) {
        localStorage.removeItem("adminToken");

        navigate("/admin/login");

        return;
      }


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to load bookings."
        );
      }


      setBookings(data);

    } catch (error) {
      console.error(
        "FETCH BOOKINGS ERROR:",
        error
      );

      setError(error.message);

    } finally {
      setLoading(false);
    }
  }, [navigate]);


  /*
    CHECK LOGIN AND LOAD BOOKINGS
  */
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchBookings();
  }, [token, fetchBookings, navigate]);


  /*
    CONFIRM BOOKING
  */
  const confirmBooking = async (id) => {
    const okay = window.confirm(
      "Have you verified the customer's payment? Confirm this booking?"
    );

    if (!okay) return;


    try {
      const response = await fetch(
        `${API_URL}/api/admin/bookings/${id}/confirm`,
        {
          method: "PUT",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to confirm booking."
        );
      }


      alert(
        "Booking confirmed successfully."
      );


      setSelectedBooking(null);

      await fetchBookings();

    } catch (error) {
      console.error(
        "CONFIRM BOOKING ERROR:",
        error
      );

      alert(error.message);
    }
  };


  /*
    CANCEL BOOKING
  */
  const cancelBooking = async (id) => {
    const okay = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!okay) return;


    try {
      const response = await fetch(
        `${API_URL}/api/admin/bookings/${id}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to cancel booking."
        );
      }


      alert("Booking cancelled.");


      setSelectedBooking(null);

      await fetchBookings();

    } catch (error) {
      console.error(
        "CANCEL BOOKING ERROR:",
        error
      );

      alert(error.message);
    }
  };


  /*
    LOGOUT
  */
  const logout = () => {
    localStorage.removeItem("adminToken");

    // navigate("/admin/login");
    navigate("/");
  };


  /*
    DASHBOARD STATISTICS
  */
  const stats = useMemo(() => {
    const pending =
      bookings.filter(
        (b) => b.status === "pending"
      ).length;


    const confirmed =
      bookings.filter(
        (b) => b.status === "confirmed"
      ).length;


    const cancelled =
      bookings.filter(
        (b) => b.status === "cancelled"
      ).length;


    const today = new Date();

    const todayKey = dateKey(today);


    const checkInsToday =
      bookings.filter(
        (b) =>
          b.status === "confirmed" &&
          dateKey(b.checkIn) === todayKey
      ).length;


    const checkOutsToday =
      bookings.filter(
        (b) =>
          b.status === "confirmed" &&
          dateKey(b.checkOut) === todayKey
      ).length;


    return {
      total: bookings.length,
      pending,
      confirmed,
      cancelled,
      checkInsToday,
      checkOutsToday,
    };
  }, [bookings]);


  /*
    SEARCH + STATUS FILTER
  */
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const text =
        search.toLowerCase().trim();


      const matchesSearch =
        !text ||
        booking.name
          ?.toLowerCase()
          .includes(text) ||
        booking.email
          ?.toLowerCase()
          .includes(text) ||
        booking.phone
          ?.toLowerCase()
          .includes(text) ||
        booking.bookingId
          ?.toLowerCase()
          .includes(text);


      const matchesStatus =
        statusFilter === "all" ||
        booking.status === statusFilter;


      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    bookings,
    search,
    statusFilter,
  ]);


  /*
    CHANGE CALENDAR MONTH
  */
  const changeMonth = (amount) => {
    setMonthDate(
      new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + amount,
        1
      )
    );
  };


  /*
    CALENDAR MONTH NAME
  */
  const monthName =
    monthDate.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );


  /*
    RECENT BOOKINGS
  */
  const recentBookings =
    filteredBookings.slice(0, 8);


  /*
    LOADING SCREEN
  */
  if (loading) {
    return (
      <div className="admin-loading">
        Loading dashboard...
      </div>
    );
  }


  /*
    DASHBOARD
  */
  return (
    <div className="admin-layout">


      {/* =========================
          SIDEBAR
      ========================== */}

      <aside className="admin-sidebar">

        <div className="admin-brand">

          <div className="admin-brand-logo">
            AR
          </div>

          <div>
            <strong>
              Akshaya
            </strong>

            <span>
              Residency
            </span>
          </div>

        </div>


        <nav>

          <button
            className="active"
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Dashboard
          </button>


          <button
            type="button"
            onClick={() =>
              document
                .getElementById("bookings")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Bookings
          </button>


          <button
            type="button"
            onClick={() =>
              document
                .getElementById("calendar")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Calendar
          </button>

        </nav>


        <button
          className="logout-button"
          onClick={logout}
          type="button"
        >
          Logout
        </button>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="admin-main">


        {/* TOPBAR */}

        <header className="admin-topbar">

          <div>

            <h1>
              Dashboard
            </h1>

            <p>
              Manage your cottage bookings
            </p>

          </div>


          <button
            className="refresh-button"
            onClick={fetchBookings}
            type="button"
          >
            ↻ Refresh
          </button>

        </header>


        {/* ERROR */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}


        {/* =========================
            STAT CARDS
        ========================== */}

        <section className="stats-grid">

          <div className="stat-card">

            <span>
              Total Bookings
            </span>

            <strong>
              {stats.total}
            </strong>

            <small>
              All booking requests
            </small>

          </div>


          <div className="stat-card pending">

            <span>
              Pending Payment
            </span>

            <strong>
              {stats.pending}
            </strong>

            <small>
              Need payment verification
            </small>

          </div>


          <div className="stat-card confirmed">

            <span>
              Confirmed
            </span>

            <strong>
              {stats.confirmed}
            </strong>

            <small>
              Active reservations
            </small>

          </div>


          <div className="stat-card cancelled">

            <span>
              Cancelled
            </span>

            <strong>
              {stats.cancelled}
            </strong>

            <small>
              Cancelled bookings
            </small>

          </div>

        </section>


        {/* =========================
            TODAY
        ========================== */}

        <section className="today-grid">

          <div className="today-card">

            <span>
              Today's Check-ins
            </span>

            <strong>
              {stats.checkInsToday}
            </strong>

          </div>


          <div className="today-card">

            <span>
              Today's Check-outs
            </span>

            <strong>
              {stats.checkOutsToday}
            </strong>

          </div>

        </section>


        {/* =========================
            CALENDAR
        ========================== */}

        <section
          id="calendar"
          className="admin-section"
        >

          <div className="section-header">

            <div>

              <h2>
                Booking Calendar
              </h2>

              <p>
                See cottage bookings by date
              </p>

            </div>


            <div className="calendar-controls">

              <button
                type="button"
                onClick={() =>
                  changeMonth(-1)
                }
              >
                ‹
              </button>


              <strong>
                {monthName}
              </strong>


              <button
                type="button"
                onClick={() =>
                  changeMonth(1)
                }
              >
                ›
              </button>

            </div>

          </div>


          <div className="calendar-grid">


            {/* WEEKDAY HEADERS */}

            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div
                className="calendar-day-name"
                key={day}
              >
                {day}
              </div>
            ))}


            {/* CALENDAR DAYS */}

            {(() => {

              const firstDay =
                new Date(
                  monthDate.getFullYear(),
                  monthDate.getMonth(),
                  1
                ).getDay();


              const days =
                new Date(
                  monthDate.getFullYear(),
                  monthDate.getMonth() + 1,
                  0
                ).getDate();


              const cells = [];


              /*
                EMPTY CELLS BEFORE FIRST DAY
              */

              for (
                let i = 0;
                i < firstDay;
                i++
              ) {
                cells.push(
                  <div
                    className="calendar-empty"
                    key={`empty-${i}`}
                  />
                );
              }


              /*
                ACTUAL DAYS
              */

              for (
                let day = 1;
                day <= days;
                day++
              ) {

                const currentDate =
                  new Date(
                    Date.UTC(
                      monthDate.getFullYear(),
                      monthDate.getMonth(),
                      day
                    )
                  );


                const key =
                  currentDate
                    .toISOString()
                    .split("T")[0];


                /*
                  BOOKINGS ACTIVE ON THIS DATE

                  Pending bookings are shown
                  because they are useful for
                  admin reference.

                  Cancelled bookings are hidden.
                */

                const dayBookings =
                  bookings.filter(
                    (booking) => {

                      const start =
                        dateKey(
                          booking.checkIn
                        );


                      const end =
                        dateKey(
                          booking.checkOut
                        );


                      return (
                        key >= start &&
                        key < end &&
                        booking.status !==
                          "cancelled"
                      );
                    }
                  );


                cells.push(

                  <div
                    className="calendar-cell"
                    key={day}
                  >

                    <span className="calendar-number">
                      {day}
                    </span>


                    {dayBookings
                      .slice(0, 2)
                      .map((booking) => (

                        <button
                          type="button"
                          className={
                            booking.status ===
                            "confirmed"
                              ? "calendar-booking confirmed"
                              : "calendar-booking pending"
                          }
                          key={booking._id}
                          onClick={() =>
                            setSelectedBooking(
                              booking
                            )
                          }
                        >

                          {booking.name}

                        </button>

                      ))}


                    {dayBookings.length > 2 && (

                      <span className="more-bookings">
                        +
                        {dayBookings.length - 2}
                      </span>

                    )}

                  </div>

                );
              }


              return cells;

            })()}

          </div>


          {/* CALENDAR LEGEND */}

          <div className="calendar-legend">

            <span>
              <i className="legend pending" />
              Pending
            </span>


            <span>
              <i className="legend confirmed" />
              Confirmed
            </span>

          </div>

        </section>


        {/* =========================
            BOOKINGS
        ========================== */}

        <section
          id="bookings"
          className="admin-section"
        >

          <div className="section-header">

            <div>

              <h2>
                Booking Details
              </h2>

              <p>
                Manage customer reservations
              </p>

            </div>

          </div>


          {/* FILTERS */}

          <div className="booking-filters">

            <input
              type="text"
              placeholder="Search name, email, phone or booking ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />


            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >

              <option value="all">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="confirmed">
                Confirmed
              </option>

              <option value="cancelled">
                Cancelled
              </option>

            </select>

          </div>


          {/* TABLE */}

          <div className="booking-table-wrapper">

            <table className="booking-table">

              <thead>

                <tr>

                  <th>
                    Booking
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Cottage
                  </th>

                  <th>
                    Stay
                  </th>

                  <th>
                    Payment
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {recentBookings.map(
                  (booking) => (

                    <tr
                      key={booking._id}
                    >

                      {/* BOOKING */}

                      <td>

                        <strong>
                          {booking.bookingId}
                        </strong>

                        <small>
                          {formatDate(
                            booking.createdAt
                          )}
                        </small>

                      </td>


                      {/* CUSTOMER */}

                      <td>

                        <strong>
                          {booking.name}
                        </strong>

                        <small>
                          {booking.email}
                        </small>

                        <small>
                          {booking.phone}
                        </small>

                      </td>


                      {/* COTTAGE */}

                      <td>

                        {
                          booking.roomId
                            ?.name ||
                          booking.roomType ||
                          "-"
                        }

                      </td>


                      {/* STAY */}

                      <td>

                        <strong>
                          {formatDate(
                            booking.checkIn
                          )}
                        </strong>

                        <small>
                          to
                        </small>

                        <strong>
                          {formatDate(
                            booking.checkOut
                          )}
                        </strong>

                        <small>
                          {booking.guests}{" "}
                          guests
                        </small>

                      </td>


                      {/* PAYMENT */}

                      <td>

                        <span
                          className={
                            booking.paymentStatus ===
                            "received"
                              ? "payment received"
                              : "payment pending"
                          }
                        >

                          {booking.paymentStatus ===
                          "received"
                            ? "Received"
                            : "Pending"}

                        </span>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`status ${booking.status}`}
                        >
                          {booking.status}
                        </span>

                      </td>


                      {/* ACTION */}

                      <td>

                        <button
                          className="view-button"
                          type="button"
                          onClick={() =>
                            setSelectedBooking(
                              booking
                            )
                          }
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  )
                )}


                {recentBookings.length ===
                  0 && (

                    <tr>

                      <td
                        colSpan="7"
                        className="empty-table"
                      >
                        No bookings found.
                      </td>

                    </tr>

                  )}

              </tbody>

            </table>

          </div>

        </section>

      </main>


      {/* =========================
          BOOKING MODAL
      ========================== */}

      {selectedBooking && (

        <div
          className="admin-modal-overlay"
          onClick={() =>
            setSelectedBooking(null)
          }
        >

          <div
            className="admin-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* CLOSE */}

            <button
              className="modal-close"
              type="button"
              onClick={() =>
                setSelectedBooking(null)
              }
            >
              ×
            </button>


            {/* HEADING */}

            <div className="modal-heading">

              <div>

                <span>
                  Booking Details
                </span>

                <h2>
                  {
                    selectedBooking.bookingId
                  }
                </h2>

              </div>


              <span
                className={`status ${selectedBooking.status}`}
              >
                {
                  selectedBooking.status
                }
              </span>

            </div>


            {/* DETAILS */}

            <div className="details-grid">


              <div>

                <label>
                  Customer
                </label>

                <strong>
                  {
                    selectedBooking.name
                  }
                </strong>

              </div>


              <div>

                <label>
                  Email
                </label>

                <strong>
                  {
                    selectedBooking.email
                  }
                </strong>

              </div>


              <div>

                <label>
                  Phone
                </label>

                <strong>
                  {
                    selectedBooking.phone
                  }
                </strong>

              </div>


              <div>

                <label>
                  Cottage
                </label>

                <strong>
                  {
                    selectedBooking.roomId
                      ?.name ||
                    selectedBooking.roomType ||
                    "-"
                  }
                </strong>

              </div>


              <div>

                <label>
                  Check-in
                </label>

                <strong>
                  {formatDate(
                    selectedBooking.checkIn
                  )}
                </strong>

              </div>


              <div>

                <label>
                  Check-out
                </label>

                <strong>
                  {formatDate(
                    selectedBooking.checkOut
                  )}
                </strong>

              </div>


              <div>

                <label>
                  Guests
                </label>

                <strong>
                  {
                    selectedBooking.guests
                  }
                </strong>

              </div>


              <div>

                <label>
                  Payment
                </label>

                <strong
                  className={
                    selectedBooking.paymentStatus ===
                    "received"
                      ? "text-success"
                      : "text-warning"
                  }
                >
                  {
                    selectedBooking.paymentStatus ===
                    "received"
                      ? "Received"
                      : "Pending"
                  }
                </strong>

              </div>

            </div>


            {/* SPECIAL REQUEST */}

            <div className="message-box">

              <label>
                Special Request
              </label>

              <p>
                {
                  selectedBooking.message ||
                  "No special request."
                }
              </p>

            </div>


            {/* PAYMENT WARNING */}

            {selectedBooking.status ===
              "pending" && (

              <div className="payment-warning">

                <strong>
                  Payment Verification Required
                </strong>

                <p>
                  Verify the customer's payment
                  through email before clicking
                  Confirm Booking.
                </p>

              </div>

            )}


            {/* ACTION BUTTONS */}

            <div className="modal-actions">


              {selectedBooking.status !==
                "confirmed" && (

                <button
                  className="confirm-button"
                  type="button"
                  onClick={() =>
                    confirmBooking(
                      selectedBooking._id
                    )
                  }
                >
                  ✓ Confirm Booking
                </button>

              )}


              {selectedBooking.status !==
                "cancelled" && (

                <button
                  className="cancel-button"
                  type="button"
                  onClick={() =>
                    cancelBooking(
                      selectedBooking._id
                    )
                  }
                >
                  Cancel Booking
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


export default AdminDashboard;