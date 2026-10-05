import React, { useCallback, useEffect, useMemo, useState,} from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const API_URL = process.env.REACT_APP_API_URL ||
  "https://akshaya-residency-backend-1.onrender.com";
const BOOKINGS_PER_PAGE = 10;

  //  DATE HELPERS

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }
  );
}

function formatDateTime(date) {
  if (!date) return "-";
  return new Date(date).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }
  );
}

function dateKey(date) {
  if (!date) return "";

  const d = new Date(date);

  return new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Asia/Kolkata",
    }
  ).format(d);
}

function getStatusLabel(status) {
  switch (status) {
    case "pending":
      return "Pending";

    case "confirmed":
      return "Confirmed";

    case "checked_in":
      return "Checked In";

    case "checked_out":
      return "Checked Out";

    case "cancelled":
      return "Cancelled";

    default:
      return status || "-";
  }
}

  //  Main component

function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthDate, setMonthDate] = useState(new Date());
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

    //  Fetch Bookings

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const currentToken = localStorage.getItem("adminToken");

      if (!currentToken) {
        navigate("/admin/login");
        return [];
      }

      const response = await fetch(
        `${API_URL}/api/admin/bookings`,
        {
          method: "GET",
          headers: {
            Authorization:
              `Bearer ${currentToken}`,
          },
        }
      );


      if (response.status === 401) {
        localStorage.removeItem(
          "adminToken"
        );
        navigate("/admin/login");
        return [];
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to load bookings."
        );
      }

      const bookingList =
        Array.isArray(data)
          ? data
          : [];

      setBookings(bookingList);
      return bookingList;

    } catch (error) {
      console.error(
        "FETCH BOOKINGS ERROR:",
        error
      );

      setError(
        error.message ||
        "Unable to load bookings."
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, [navigate]);

    //  Initial Load

  useEffect(() => {
    const currentToken =
      localStorage.getItem("adminToken");

    if (!currentToken) {
      navigate("/admin/login");
      return;
    }

    fetchBookings();
  }, [
    fetchBookings,
    navigate,
  ]);

    // Selected Booking update

  const refreshSelectedBooking = async (id) => {
    const updatedBookings =
      await fetchBookings();

    const updatedBooking =
      updatedBookings.find(
        (booking) =>
          booking._id === id
      );

    if (updatedBooking) {
      setSelectedBooking(
        updatedBooking
      );
    }
  };

    //  Verify Id

  const verifyId = async (id) => {
    const okay = window.confirm(
      "Have you checked and verified the customer's ID proof?"
    );

    if (!okay) return;

    try {
      setActionLoading(true);

      const currentToken =
        localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/bookings/${id}/verify-id`,
        {
          method: "PUT",
          headers: {
            Authorization:
              `Bearer ${currentToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to verify ID."
        );
      }

      alert(
        "Customer ID verified successfully."
      );

      await refreshSelectedBooking(id);

    } catch (error) {
      console.error(
        "VERIFY ID ERROR:",
        error
      );

      alert(error.message);

    } finally {
      setActionLoading(false);
    }
  };

    //  Reject Id

  const rejectId = async (id) => {
    const reason =
      window.prompt(
        "Enter the reason for rejecting this ID proof:"
      );

    if (reason === null) {
      return;
    }

    try {
      setActionLoading(true);
      const currentToken = localStorage.getItem("adminToken");
      const response = await fetch(
        `${API_URL}/api/admin/bookings/${id}/reject-id`,
        {
          method: "PUT",
          headers: {
            Authorization:
              `Bearer ${currentToken}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            reason:
              reason.trim(),
          }),
        }
      );

      const data =  await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to reject ID."
        );
      }

      alert(
        "Customer ID marked as rejected."
      );

      await refreshSelectedBooking(id);

    } catch (error) {
      console.error(
        "REJECT ID ERROR:",
        error
      );

      alert(error.message);

    } finally {
      setActionLoading(false);
    }
  };

    //  View Id Proof

const viewIdProof = async (booking) => {
  let newTab = null;

  try {
    newTab = window.open("", "_blank");

    if (!newTab) {
      throw new Error("Please allow pop-ups to view the ID proof.");
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin session expired. Please login again.");
    }

    const response = await fetch(
      `${API_URL}/api/admin/bookings/${booking._id}/id-proof`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const rawText = await response.text();

    console.log("ID PROOF STATUS:", response.status);
    console.log("ID PROOF RESPONSE:", rawText);

    let data;

    try {
      data = JSON.parse(rawText);
    } catch {
      throw new Error(
        `Server returned invalid response (${response.status}).`
      );
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
        data.error?.message ||
        `Unable to open ID proof. Server status: ${response.status}`
      );
    }

    if (!data.url) {
      throw new Error(
        data.message || "Server did not return an ID proof URL."
      );
    }

    console.log("CLOUDINARY ID URL:", data.url);
    newTab.location.href = data.url;
  } catch (error) {
    console.error("VIEW ID PROOF ERROR:", error);

    if (newTab && !newTab.closed) {
      newTab.close();
    }

    alert(error.message || "Unable to open ID proof.");
  }
};

    //  Mark payment received

  const markPaymentReceived =
    async (id) => {
      const okay = window.confirm(
        "Have you verified the customer's payment proof? Mark payment as received?"
      );

      if (!okay) return;

      try {
        setActionLoading(true);

        const currentToken = localStorage.getItem("adminToken");
        const response = await fetch(
            `${API_URL}/api/admin/bookings/${id}/payment`,
            {
              method: "PUT",
              headers: {
                Authorization:
                  `Bearer ${currentToken}`,
              },
            }
          );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Unable to update payment."
          );
        }

        alert(
          "Payment marked as received."
        );

        // Keep modal open.
        await refreshSelectedBooking(id);

      } catch (error) {
        console.error(
          "PAYMENT ERROR:",
          error
        );

        alert(error.message);

      } finally {
        setActionLoading(false);
      }
    };

    //  Confirm booking

  const confirmBooking =
    async (id) => {
      const okay = window.confirm(
        "Confirm this booking? The customer ID and payment must already be verified."
      );

      if (!okay) return;


      try {
        setActionLoading(true);

        const currentToken =
          localStorage.getItem("adminToken");

        const response =
          await fetch(
            `${API_URL}/api/admin/bookings/${id}/confirm`,
            {
              method: "PUT",

              headers: {
                Authorization:
                  `Bearer ${currentToken}`,
              },
            }
          );


        const data =
          await response.json();


        if (!response.ok) {
          throw new Error(
            data.message ||
            "Unable to confirm booking."
          );
        }


        alert(
          "Booking confirmed successfully. Confirmation email sent to customer."
        );

        // Keep modal open.
        await refreshSelectedBooking(id);

      } catch (error) {
        console.error(
          "CONFIRM BOOKING ERROR:",
          error
        );

        alert(error.message);

      } finally {
        setActionLoading(false);
      }
    };

    //  Check In

  const checkInBooking =
    async (id) => {
      const okay = window.confirm(
        "Record the customer's actual check-in now?"
      );

      if (!okay) return;

      try {
        setActionLoading(true);
        const currentToken =
          localStorage.getItem("adminToken");

        const response =
          await fetch(
            `${API_URL}/api/admin/bookings/${id}/check-in`,
            {
              method: "PUT",

              headers: {
                Authorization:
                  `Bearer ${currentToken}`,
              },
            }
          );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Unable to record check-in."
          );
        }

        alert(
          `Customer checked in at ${formatDateTime(
            data.booking?.actualCheckInAt
          )}`
        );

        await refreshSelectedBooking(id);

      } catch (error) {
        console.error(
          "CHECK IN ERROR:",
          error
        );

        alert(error.message);

      } finally {
        setActionLoading(false);
      }
    };

    //  Check Out

  const checkOutBooking =
    async (id) => {
      const okay = window.confirm(
        "Record the customer's actual check-out now?"
      );
      if (!okay) return;

      try {
        setActionLoading(true);
        const currentToken = localStorage.getItem("adminToken");
        const response = await fetch(
            `${API_URL}/api/admin/bookings/${id}/check-out`,
            {
              method: "PUT",
              headers: {
                Authorization:
                  `Bearer ${currentToken}`,
              },
            }
          );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Unable to record check-out."
          );
        }

        alert(
          `Customer checked out at ${formatDateTime(
            data.booking?.actualCheckOutAt
          )}`
        );

        await refreshSelectedBooking(id);

      } catch (error) {
        console.error(
          "CHECK OUT ERROR:",
          error
        );

        alert(error.message);

      } finally {
        setActionLoading(false);
      }
    };

    //  Cancel Booking

  const cancelBooking =
    async (id) => {
      const reason =
        window.prompt(
          "Enter the reason for cancelling this booking:"
        );

      if (reason === null) {
        return;
      }

      const trimmedReason =
        reason.trim();

      if (!trimmedReason) {
        alert(
          "Please enter a cancellation reason."
        );
        return;
      }

      const okay = window.confirm(
        "Are you sure you want to cancel this booking?"
      );

      if (!okay) return;

      try {
        setActionLoading(true);

        const currentToken = localStorage.getItem("adminToken");
        const response = await fetch(
            `${API_URL}/api/admin/bookings/${id}/cancel`,
            {
              method: "PUT",

              headers: {
                Authorization:
                  `Bearer ${currentToken}`,

                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                reason:
                  trimmedReason,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Unable to cancel booking."
          );
        }

        alert(
          "Booking cancelled. Cancellation email sent to customer."
        );

        await refreshSelectedBooking(id);

      } catch (error) {
        console.error(
          "CANCEL BOOKING ERROR:",
          error
        );

        alert(error.message);

      } finally {
        setActionLoading(false);
      }
    };

    //  Logout

  const logout = () => {
    localStorage.removeItem(
      "adminToken"
    );

    navigate("/");
  };

    //  Statistics

  const stats = useMemo(() => {
    const pending =
      bookings.filter(
        (b) =>
          b.status === "pending"
      ).length;

    const confirmed =
      bookings.filter(
        (b) =>
          b.status === "confirmed"
      ).length;

    const checkedIn =
      bookings.filter(
        (b) =>
          b.status === "checked_in"
      ).length;

    const checkedOut =
      bookings.filter(
        (b) =>
          b.status === "checked_out"
      ).length;

    const cancelled =
      bookings.filter(
        (b) =>
          b.status === "cancelled"
      ).length;

    const today =
      dateKey(new Date());

    const checkInsToday =
      bookings.filter(
        (b) =>
          (
            b.status === "confirmed" ||
            b.status === "checked_in"
          ) &&
          dateKey(b.checkIn) === today
      ).length;

    const checkOutsToday =
      bookings.filter(
        (b) =>
          (
            b.status === "confirmed" ||
            b.status === "checked_in"
          ) &&
          dateKey(b.checkOut) === today
      ).length;

    return {
      total: bookings.length,
      pending,
      confirmed,
      checkedIn,
      checkedOut,
      cancelled,
      checkInsToday,
      checkOutsToday,
    };
  }, [bookings]);

    //  Search , filter

  const filteredBookings =
    useMemo(() => {
      return bookings.filter(
        (booking) => {
          const text =
            search
              .toLowerCase()
              .trim();

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
            booking.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      bookings,
      search,
      statusFilter,
    ]);

    //  Reset page search and filters

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    statusFilter,
  ]);

    //  Pagination

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredBookings.length /
          BOOKINGS_PER_PAGE
      )
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const pageStart =
    (safeCurrentPage - 1) *
    BOOKINGS_PER_PAGE;

  const paginatedBookings =
    filteredBookings.slice(
      pageStart,
      pageStart + BOOKINGS_PER_PAGE
    );

  const showingFrom =
    filteredBookings.length === 0
      ? 0
      : pageStart + 1;

  const showingTo =
    Math.min(
      pageStart +
        BOOKINGS_PER_PAGE,
      filteredBookings.length
    );

    //  Calendar

  const changeMonth =
    (amount) => {
      setMonthDate(
        new Date(
          monthDate.getFullYear(),
          monthDate.getMonth() +
            amount,
          1
        )
      );
    };

  const monthName =
    monthDate.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );

    //  Loading

  if (loading) {
    return (
      <div className="admin-loading">
        Loading dashboard...
      </div>
    );
  }

    //  Dashboard

  return (
    <div className="admin-layout">

          {/* Sidebar */}

      <aside className="admin-sidebar">

        <div className="admin-brand">

          <div className="admin-brand-logo">
            AR
          </div>

          <div>
            <strong> Akshaya </strong>
            <span> Residency </span>
          </div>

        </div>

        <nav>

          <button className="active" type="button" onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Dashboard
          </button>

          <button type="button" onClick={() =>
              document
                .getElementById(
                  "bookings"
                )
                ?.scrollIntoView({
                  behavior:
                    "smooth",
                })
            }
          >
            Bookings
          </button>

          <button type="button" onClick={() =>
              document
                .getElementById(
                  "calendar"
                )
                ?.scrollIntoView({
                  behavior:
                    "smooth",
                })
            }
          >
            Calendar
          </button>

        </nav>

        <button className="logout-button" onClick={logout} type="button">
          Logout
        </button>

      </aside>

          {/* Main*/}

      <main className="admin-main">

        {/* Topbar */}

        <header className="admin-topbar">

          <div>

            <h1> Dashboard </h1>

            <p> Manage your cottage bookings </p>

          </div>

          <button className="refresh-button" onClick={fetchBookings} type="button">
            ↻ Refresh
          </button>

        </header>


        {/* Error */}

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

            {/* Statistics */}

        <section className="stats-grid">

          <div className="stat-card">

            <span> Total Bookings </span>

            <strong> {stats.total} </strong>

            <small> All booking requests </small>

          </div>

          <div className="stat-card pending">

            <span> Pending </span>

            <strong> {stats.pending} </strong>

            <small> Need verification </small>

          </div>

          <div className="stat-card confirmed">

            <span> Confirmed </span>

            <strong>{stats.confirmed}</strong>

            <small> Awaiting arrival </small>

          </div>

          <div className="stat-card cancelled">

            <span> Cancelled </span>

            <strong> {stats.cancelled} </strong>

            <small> Cancelled bookings </small>

          </div>

        </section>

            {/* TODAY */}

        <section className="today-grid">

          <div className="today-card">

            <span> Today's Check-ins </span>

            <strong> {stats.checkInsToday} </strong>

          </div>

          <div className="today-card">

            <span> Today's Check-outs </span>

            <strong> {stats.checkOutsToday} </strong>

          </div>

        </section>

            {/* CALENDAR */}

        <section id="calendar" className="admin-section">

          <div className="section-header">

            <div>

              <h2> Booking Calendar </h2>

              <p> See cottage bookings by date </p>

            </div>

            <div className="calendar-controls">

              <button type="button" onClick={() =>
                  changeMonth(-1)
                }
              >
                ‹
              </button>

              <strong> {monthName} </strong>

              <button type="button" onClick={() =>
                  changeMonth(1)
                }
              >
                ›
              </button>

            </div>

          </div>

          <div className="calendar-grid">

            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div className="calendar-day-name" key={day}>
                {day}
              </div>
            ))}


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
                  monthDate.getMonth() +
                    1,
                  0
                ).getDate();

              const cells = [];


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

              for (
                let day = 1;
                day <= days;
                day++
              ) {
                const currentDate =
                  new Date(
                    monthDate.getFullYear(),
                    monthDate.getMonth(),
                    day
                  );

                const key =
                  dateKey(
                    currentDate
                  );

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
                  <div className="calendar-cell" key={day} >

                    <span className="calendar-number"> {day} </span>

                    {dayBookings
                      .slice(0, 2)
                      .map(
                        (booking) => (
                          <button type="button"
                            className={
                              booking.status ===
                              "pending"
                                ? "calendar-booking pending"
                                : "calendar-booking confirmed"
                            }
                            key={
                              booking._id
                            }
                            onClick={() =>
                              setSelectedBooking(
                                booking
                              )
                            }
                          >
                            {booking.name}
                          </button>
                        )
                      )}

                    {dayBookings.length >
                      2 && (
                      <span className="more-bookings">
                        +
                        {dayBookings.length -
                          2}
                      </span>
                    )}

                  </div>
                );
              }


              return cells;
            })()}

          </div>

          <div className="calendar-legend">

            <span> <i className="legend pending" /> Pending </span>

            <span> <i className="legend confirmed" /> Confirmed </span>

          </div>

        </section>

            {/* BOOKINGS */}

        <section id="bookings" className="admin-section">

          <div className="section-header">

            <div>

              <h2> Booking Details </h2>

              <p> Manage customer reservations </p>

            </div>

          </div>


          {/* FILTERS */}

          <div className="booking-filters">

            <input
              type="text"
              placeholder="Search name, email, phone or booking ID..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
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

              <option value="all"> All Status </option>

              <option value="pending"> Pending </option>

              <option value="confirmed"> Confirmed </option>

              <option value="checked_in"> Checked In </option>

              <option value="checked_out"> Checked Out </option>

              <option value="cancelled"> Cancelled </option>

            </select>

          </div>

          {/* RESULT COUNT */}

          <div className="booking-results-info">
            <span>
              Showing{" "}
              <strong> {showingFrom} </strong>
              {" – "}
              <strong> {showingTo} </strong>
              {" of "}
              <strong> {filteredBookings.length} </strong>
              {" bookings"}
            </span>
          </div>


          {/* TABLE */}

          <div className="booking-table-wrapper">

            <table className="booking-table">

              <thead>

                <tr>

                  <th> Booking </th>

                  <th> Customer </th>

                  <th> Cottage </th>

                  <th> Stay </th>

                  <th> Actual Check-in </th>

                  <th> Actual Check-out </th>

                  <th> Payment </th>

                  <th> Status </th>

                  <th> Action </th>

                </tr>

              </thead>

              <tbody>

                {paginatedBookings.map(
                  (booking) => (
                    <tr
                      key={
                        booking._id
                      }
                    >

                      {/* BOOKING */}

                      <td>

                        <strong>
                          {
                            booking.bookingId
                          }
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
                          {
                            booking.name
                          }
                        </strong>

                        <small>
                          {
                            booking.email
                          }
                        </small>

                        <small>
                          {
                            booking.phone
                          }
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

                      {/* RESERVED STAY */}

                      <td>

                        <strong>
                          {formatDate(
                            booking.checkIn
                          )}
                        </strong>

                        <small> to </small>

                        <strong>
                          {formatDate(
                            booking.checkOut
                          )}
                        </strong>

                        <small>
                          {
                            booking.guests
                          }{" "}
                          guests
                        </small>

                      </td>

                      {/* ACTUAL CHECK-IN */}

                      <td>

                        {booking.actualCheckInAt ? (
                          <strong>
                            {formatDateTime(
                              booking.actualCheckInAt
                            )}
                          </strong>
                        ) : (
                          <small> Not checked in </small>
                        )}

                      </td>

                      {/* ACTUAL CHECK-OUT */}

                      <td>

                        {booking.actualCheckOutAt ? (
                          <strong>
                            {formatDateTime(
                              booking.actualCheckOutAt
                            )}
                          </strong>
                        ) : (
                          <small> Not checked out </small>
                        )}

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
                          {getStatusLabel(
                            booking.status
                          )}
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

                {paginatedBookings.length ===
                  0 && (
                  <tr>

                    <td colSpan="9"  className="empty-table" >
                      No bookings found.
                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>


          {/* PAGINATION */}

          {filteredBookings.length >
            BOOKINGS_PER_PAGE && (

            <div className="booking-pagination">

              <button
                type="button"
                className="pagination-button"
                disabled={
                  safeCurrentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.max(
                        1,
                        page - 1
                      )
                  )
                }
              >
                ← Previous
              </button>

              <div className="pagination-pages">

                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map(
                  (page) => (
                    <button
                      type="button"
                      key={page}
                      className={`pagination-number ${
                        safeCurrentPage ===
                        page
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }
                    >
                      {page}
                    </button>
                  )
                )}

              </div>

              <button
                type="button"
                className="pagination-button"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.min(
                        totalPages,
                        page + 1
                      )
                  )
                }
              >
                Next →
              </button>

            </div>

          )}

        </section>

      </main>

          {/* BOOKING MODAL */}

      {selectedBooking && (

        <div
          className="admin-modal-overlay"
          onClick={() =>
            !actionLoading &&
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
              disabled={actionLoading}
              onClick={() =>
                setSelectedBooking(
                  null
                )
              }
            >
              ×
            </button>

            {/* HEADING */}

            <div className="modal-heading">

              <div>

                <span> Booking Details </span>

                <h2>
                  {
                    selectedBooking.bookingId
                  }
                </h2>

              </div>

              <span
                className={`status ${selectedBooking.status}`}
              >
                {getStatusLabel(
                  selectedBooking.status
                )}
              </span>

            </div>

            {/* CUSTOMER DETAILS */}

            <div className="details-grid">

              <div>

                <label> Customer </label>

                <strong>
                  {
                    selectedBooking.name
                  }
                </strong>

              </div>

              <div>

                <label> Email </label>

                <strong>
                  {
                    selectedBooking.email
                  }
                </strong>

              </div>

              <div>

                <label> Phone </label>

                <strong>
                  {
                    selectedBooking.phone
                  }
                </strong>

              </div>

              <div>

                <label> Cottage </label>

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

                <label> Reserved Check-in </label>

                <strong>
                  {formatDate(
                    selectedBooking.checkIn
                  )}
                </strong>

              </div>

              <div>

                <label> Reserved Check-out </label>

                <strong>
                  {formatDate(
                    selectedBooking.checkOut
                  )}
                </strong>

              </div>

              <div>

                <label> Guests </label>

                <strong>
                  {
                    selectedBooking.guests
                  }
                </strong>

              </div>

              <div>

                <label> Payment </label>

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

              <div>

                <label> Actual Check-in </label>

                <strong>
                  {formatDateTime(
                    selectedBooking.actualCheckInAt
                  )}
                </strong>

              </div>

              <div>

                <label> Actual Check-out </label>

                <strong>
                  {formatDateTime(
                    selectedBooking.actualCheckOutAt
                  )}
                </strong>

              </div>

              <div>

                <label> ID Verification </label>

                <strong
                  className={
                    selectedBooking
                      .idVerificationStatus ===
                    "verified"
                      ? "text-success"
                      : selectedBooking
                          .idVerificationStatus ===
                        "rejected"
                      ? "text-danger"
                      : "text-warning"
                  }
                >
                  {
                    selectedBooking.idVerificationStatus ||
                    "Pending"
                  }
                </strong>

              </div>

            </div>

                {/* ID PROOF */}

            <div className="message-box">

              <label> ID Proof </label>

              <p>

                {selectedBooking.idProof
                  ?.originalName
                  ? selectedBooking
                      .idProof
                      .originalName
                  : "No ID proof information available."}

              </p>

              <div
                className="modal-actions"
                style={{
                  marginTop:
                    "10px",
                }}
              >

                {selectedBooking.idProof
                  ?.publicId && (

                  <button
                    className="view-button"
                    type="button"
                    disabled={
                      actionLoading
                    }
                    onClick={() =>
                      viewIdProof(
                        selectedBooking
                      )
                    }
                  >
                    View ID Proof
                  </button>

                )}

                {selectedBooking
                  .idVerificationStatus !==
                  "verified" &&
                  selectedBooking.status !==
                    "cancelled" && (

                  <button
                    className="confirm-button"
                    type="button"
                    disabled={
                      actionLoading
                    }
                    onClick={() =>
                      verifyId(
                        selectedBooking._id
                      )
                    }
                  >
                    ✓ Verify ID
                  </button>

                )}

                {selectedBooking
                  .idVerificationStatus !==
                  "verified" &&
                  selectedBooking.status !==
                    "cancelled" && (

                  <button
                    className="cancel-button"
                    type="button"
                    disabled={
                      actionLoading
                    }
                    onClick={() =>
                      rejectId(
                        selectedBooking._id
                      )
                    }
                  >
                    Reject ID
                  </button>

                )}

              </div>

            </div>

                {/* STAY TRACKING */}

            <div className="message-box">

              <label> Stay Tracking </label>

              <p>
                <strong>
                  Reserved:
                </strong>{" "}
                {formatDate(
                  selectedBooking.checkIn
                )}{" "}
                →{" "}
                {formatDate(
                  selectedBooking.checkOut
                )}
              </p>

              <p>
                <strong>
                  Actual Check-in:
                </strong>{" "}
                {formatDateTime(
                  selectedBooking.actualCheckInAt
                )}
              </p>

              <p>
                <strong>
                  Actual Check-out:
                </strong>{" "}
                {formatDateTime(
                  selectedBooking.actualCheckOutAt
                )}
              </p>

              {selectedBooking.status ===
                "confirmed" && (

                <button
                  className="confirm-button"
                  type="button"
                  disabled={
                    actionLoading
                  }
                  onClick={() =>
                    checkInBooking(
                      selectedBooking._id
                    )
                  }
                >
                  {actionLoading
                    ? "Processing..."
                    : "✓ Check In Customer"}
                </button>

              )}

              {selectedBooking.status ===
                "checked_in" && (

                <button
                  className="confirm-button"
                  type="button"
                  disabled={
                    actionLoading
                  }
                  onClick={() =>
                    checkOutBooking(
                      selectedBooking._id
                    )
                  }
                >
                  {actionLoading
                    ? "Processing..."
                    : "✓ Check Out Customer"}
                </button>

              )}

              {selectedBooking.status ===
                "checked_out" && (

                <p
                  className="text-success"
                  style={{
                    marginTop:
                      "12px",
                    fontWeight:
                      "600",
                  }}
                >
                  ✓ Customer has checked
                  out. Actual stay times
                  have been recorded.
                </p>

              )}

            </div>

                {/* SPECIAL REQUEST */}

            <div className="message-box">

              <label> Special Request </label>

              <p>
                {
                  selectedBooking.message ||
                  "No special request."
                }
              </p>

            </div>

                {/* CANCELLATION INFORMATION */}

            {selectedBooking.status ===
              "cancelled" && (

              <div className="payment-warning">

                <strong> Booking Cancelled </strong>

                <p>
                  <strong>
                    Reason:
                  </strong>{" "}
                  {
                    selectedBooking.cancellationReason ||
                    "No reason recorded."
                  }
                </p>

                {selectedBooking.cancelledAt && (
                  <p>
                    <strong>
                      Cancelled At:
                    </strong>{" "}
                    {formatDateTime(
                      selectedBooking.cancelledAt
                    )}
                  </p>
                )}

              </div>

            )}

                {/* PENDING VERIFICATION WARNING */}

            {selectedBooking.status ===
              "pending" && (

              <div className="payment-warning">

                <strong> Verification Required </strong>

                <p>
                  Verify the customer's ID
                  proof and payment before
                  confirming this booking.
                </p>

              </div>

            )}

                {/* PAYMENT ACTION */}

            {selectedBooking.status !==
              "cancelled" &&
              selectedBooking.paymentStatus !==
                "received" && (

              <div className="message-box">

                <label> Payment Verification </label>

                <p>
                  Current payment status:
                  {" "}
                  <strong> Pending </strong>
                </p>

                <button
                  className="confirm-button" type="button"
                  disabled={
                    actionLoading
                  }
                  onClick={() =>
                    markPaymentReceived(
                      selectedBooking._id
                    )
                  }
                >
                  {actionLoading
                    ? "Processing..."
                    : "✓ Mark Payment Received"}
                </button>

              </div>

            )}

                {/* MAIN ACTION BUTTONS */}

            <div className="modal-actions">

              {selectedBooking.status ===
                "pending" && (

                <button
                  className="confirm-button"
                  type="button"
                  disabled={
                    actionLoading ||
                    selectedBooking
                      .idVerificationStatus !==
                      "verified" ||
                    selectedBooking
                      .paymentStatus !==
                      "received"
                  }
                  onClick={() =>
                    confirmBooking(
                      selectedBooking._id
                    )
                  }
                >
                  {actionLoading
                    ? "Processing..."
                    : "✓ Confirm Booking"}
                </button>

              )}

              {selectedBooking.status !==
                "cancelled" &&
                selectedBooking.status !==
                  "checked_out" && (

                <button
                  className="cancel-button"
                  type="button"
                  disabled={
                    actionLoading
                  }
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

                {/* DISABLED CONFIRM EXPLANATION */}

            {selectedBooking.status ===
              "pending" &&
              (
                selectedBooking
                  .idVerificationStatus !==
                  "verified" ||
                selectedBooking
                  .paymentStatus !==
                  "received"
              ) && (

                <div
                  className="payment-warning"
                  style={{
                    marginTop:
                      "12px",
                  }}
                >

                  <strong> Booking cannot be confirmed yet. </strong>

                  <p>

                    {selectedBooking
                      .idVerificationStatus !==
                      "verified" &&
                      " ID proof must be verified."}

                    {selectedBooking
                      .paymentStatus !==
                      "received" &&
                      " Payment must be marked as received."}

                  </p>

                </div>

              )}

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;