
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
  "https://akshaya-residency-backend-1.onrender.com";

const BOOKINGS_PER_PAGE = 10;

// DATE HELPERS

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function formatDateTime(date) {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}

function dateKey(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
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

// MAIN COMPONENT

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

  // FETCH BOOKINGS

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return [];
      }

      const response = await fetch(
        `${API_URL}/api/admin/bookings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return [];
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load bookings."
        );
      }

      const bookingList = Array.isArray(data) ? data : [];

      setBookings(bookingList);
      return bookingList;
    } catch (err) {
      console.error("FETCH BOOKINGS ERROR:", err);

      setError(
        err.message || "Unable to load bookings."
      );

      return [];
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // INITIAL LOAD

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
      return;
    }

    fetchBookings();
  }, [fetchBookings, navigate]);

  // REFRESH SELECTED BOOKING

  const refreshSelectedBooking = async (id) => {
    const updatedBookings = await fetchBookings();

    const updatedBooking = updatedBookings.find(
      (booking) => booking._id === id
    );

    if (updatedBooking) {
      setSelectedBooking(updatedBooking);
    }
  };

  // COMMON API ERROR HANDLING

  const getResponseData = async (response) => {
    const data = await response.json().catch(() => ({}));

    if (response.status === 401) {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
      throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
      throw new Error(
        data.message || "The requested action failed."
      );
    }

    return data;
  };

  // MARK PAYMENT RECEIVED

  const markPaymentReceived = async (id) => {
    const okay = window.confirm(
      "Have you verified the customer's payment proof? Mark payment as received?"
    );

    if (!okay) return;

    try {
      setActionLoading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/bookings/${id}/payment`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getResponseData(response);

      alert("Payment marked as received.");

      await refreshSelectedBooking(id);
    } catch (err) {
      console.error("PAYMENT ERROR:", err);
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // CONFIRM BOOKING - NO ID VERIFICATION REQUIRED

  const confirmBooking = async (id) => {
    const booking = bookings.find((item) => item._id === id);

    if (!booking) {
      alert("Booking not found. Please refresh the dashboard.");
      return;
    }

    if (booking.paymentStatus !== "received") {
      alert("Please mark the payment as received before confirming.");
      return;
    }

    const okay = window.confirm(
      "Confirm this booking? Payment must already be verified."
    );

    if (!okay) return;

    try {
      setActionLoading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/bookings/${id}/confirm`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getResponseData(response);

      alert(
        "Booking confirmed successfully."
      );

      await refreshSelectedBooking(id);
    } catch (err) {
      console.error("CONFIRM BOOKING ERROR:", err);
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // CHECK IN

  const checkInBooking = async (id) => {
    if (
      !window.confirm(
        "Record the customer's actual check-in now?"
      )
    ) {
      return;
    }

    try {
      setActionLoading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/bookings/${id}/check-in`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await getResponseData(response);

      alert(
        `Customer checked in at ${formatDateTime(
          data.booking?.actualCheckInAt
        )}`
      );

      await refreshSelectedBooking(id);
    } catch (err) {
      console.error("CHECK IN ERROR:", err);
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // CHECK OUT

  const checkOutBooking = async (id) => {
    if (
      !window.confirm(
        "Record the customer's actual check-out now?"
      )
    ) {
      return;
    }

    try {
      setActionLoading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/bookings/${id}/check-out`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await getResponseData(response);

      alert(
        `Customer checked out at ${formatDateTime(
          data.booking?.actualCheckOutAt
        )}`
      );

      await refreshSelectedBooking(id);
    } catch (err) {
      console.error("CHECK OUT ERROR:", err);
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // CANCEL BOOKING

  const cancelBooking = async (id) => {
    const reason = window.prompt(
      "Enter the reason for cancelling this booking:"
    );

    if (reason === null) return;

    const trimmedReason = reason.trim();

    if (!trimmedReason) {
      alert("Please enter a cancellation reason.");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to cancel this booking?"
      )
    ) {
      return;
    }

    try {
      setActionLoading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/bookings/${id}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: trimmedReason,
          }),
        }
      );

      await getResponseData(response);

      alert("Booking cancelled successfully.");

      await refreshSelectedBooking(id);
    } catch (err) {
      console.error("CANCEL BOOKING ERROR:", err);
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // LOGOUT

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  // STATISTICS

  const stats = useMemo(() => {
    const today = dateKey(new Date());

    return {
      total: bookings.length,
      pending: bookings.filter(
        (b) => b.status === "pending"
      ).length,
      confirmed: bookings.filter(
        (b) => b.status === "confirmed"
      ).length,
      checkedIn: bookings.filter(
        (b) => b.status === "checked_in"
      ).length,
      checkedOut: bookings.filter(
        (b) => b.status === "checked_out"
      ).length,
      cancelled: bookings.filter(
        (b) => b.status === "cancelled"
      ).length,
      checkInsToday: bookings.filter(
        (b) =>
          ["confirmed", "checked_in"].includes(b.status) &&
          dateKey(b.checkIn) === today
      ).length,
      checkOutsToday: bookings.filter(
        (b) =>
          ["confirmed", "checked_in"].includes(b.status) &&
          dateKey(b.checkOut) === today
      ).length,
    };
  }, [bookings]);

  // SEARCH AND FILTER

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const text = search.toLowerCase().trim();

      const matchesSearch =
        !text ||
        booking.name?.toLowerCase().includes(text) ||
        booking.email?.toLowerCase().includes(text) ||
        booking.phone?.toLowerCase().includes(text) ||
        booking.bookingId?.toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "all" ||
        booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // PAGINATION

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / BOOKINGS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pageStart =
    (safeCurrentPage - 1) * BOOKINGS_PER_PAGE;

  const paginatedBookings = filteredBookings.slice(
    pageStart,
    pageStart + BOOKINGS_PER_PAGE
  );

  const showingFrom =
    filteredBookings.length === 0 ? 0 : pageStart + 1;

  const showingTo = Math.min(
    pageStart + BOOKINGS_PER_PAGE,
    filteredBookings.length
  );

  // CALENDAR

  const changeMonth = (amount) => {
    setMonthDate(
      new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + amount,
        1
      )
    );
  };

  const monthName = monthDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  // DASHBOARD UI

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-logo">AR</div>
          <div>
            <strong>Akshaya</strong>
            <span>Residency</span>
          </div>
        </div>

        <nav>
          <button
            className="active"
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() =>
              document.getElementById("bookings")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Bookings
          </button>

          <button
            type="button"
            onClick={() =>
              document.getElementById("calendar")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Calendar
          </button>
        </nav>

        <button
          className="logout-button"
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Manage your cottage bookings</p>
          </div>

          <button
            className="refresh-button"
            type="button"
            onClick={fetchBookings}
          >
            ↻ Refresh
          </button>
        </header>

        {error && <div className="admin-error">{error}</div>}

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Bookings</span>
            <strong>{stats.total}</strong>
            <small>All booking requests</small>
          </div>

          <div className="stat-card pending">
            <span>Pending</span>
            <strong>{stats.pending}</strong>
            <small>Awaiting payment and confirmation</small>
          </div>

          <div className="stat-card confirmed">
            <span>Confirmed</span>
            <strong>{stats.confirmed}</strong>
            <small>Awaiting arrival</small>
          </div>

          <div className="stat-card cancelled">
            <span>Cancelled</span>
            <strong>{stats.cancelled}</strong>
            <small>Cancelled bookings</small>
          </div>
        </section>

        <section className="today-grid">
          <div className="today-card">
            <span>Today's Check-ins</span>
            <strong>{stats.checkInsToday}</strong>
          </div>

          <div className="today-card">
            <span>Today's Check-outs</span>
            <strong>{stats.checkOutsToday}</strong>
          </div>
        </section>

        {/* CALENDAR */}

        <section id="calendar" className="admin-section">
          <div className="section-header">
            <div>
              <h2>Booking Calendar</h2>
              <p>See cottage bookings by date</p>
            </div>

            <div className="calendar-controls">
              <button type="button" onClick={() => changeMonth(-1)}>
                ‹
              </button>
              <strong>{monthName}</strong>
              <button type="button" onClick={() => changeMonth(1)}>
                ›
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <div className="calendar-day-name" key={day}>
                  {day}
                </div>
              )
            )}

            {(() => {
              const firstDay = new Date(
                monthDate.getFullYear(),
                monthDate.getMonth(),
                1
              ).getDay();

              const days = new Date(
                monthDate.getFullYear(),
                monthDate.getMonth() + 1,
                0
              ).getDate();

              const cells = [];

              for (let i = 0; i < firstDay; i++) {
                cells.push(
                  <div
                    className="calendar-empty"
                    key={`empty-${i}`}
                  />
                );
              }

              for (let day = 1; day <= days; day++) {
                const currentDate = new Date(
                  monthDate.getFullYear(),
                  monthDate.getMonth(),
                  day
                );

                const key = dateKey(currentDate);

                const dayBookings = bookings.filter((booking) => {
                  return (
                    key >= dateKey(booking.checkIn) &&
                    key < dateKey(booking.checkOut) &&
                    booking.status !== "cancelled"
                  );
                });

                cells.push(
                  <div className="calendar-cell" key={day}>
                    <span className="calendar-number">{day}</span>

                    {dayBookings.slice(0, 2).map((booking) => (
                      <button
                        type="button"
                        className={
                          booking.status === "pending"
                            ? "calendar-booking pending"
                            : "calendar-booking confirmed"
                        }
                        key={booking._id}
                        onClick={() => setSelectedBooking(booking)}
                      >
                        {booking.name}
                      </button>
                    ))}

                    {dayBookings.length > 2 && (
                      <span className="more-bookings">
                        +{dayBookings.length - 2}
                      </span>
                    )}
                  </div>
                );
              }

              return cells;
            })()}
          </div>

          <div className="calendar-legend">
            <span><i className="legend pending" /> Pending</span>
            <span><i className="legend confirmed" /> Confirmed</span>
          </div>
        </section>

        {/* BOOKINGS */}

        <section id="bookings" className="admin-section">
          <div className="section-header">
            <div>
              <h2>Booking Details</h2>
              <p>Manage customer reservations</p>
            </div>
          </div>

          <div className="booking-filters">
            <input
              type="text"
              placeholder="Search name, email, phone or booking ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="booking-results-info">
            <span>
              Showing <strong>{showingFrom}</strong> –{" "}
              <strong>{showingTo}</strong> of{" "}
              <strong>{filteredBookings.length}</strong> bookings
            </span>
          </div>

          <div className="booking-table-wrapper">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Customer</th>
                  <th>Cottage</th>
                  <th>Stay</th>
                  <th>Actual Check-in</th>
                  <th>Actual Check-out</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <strong>{booking.bookingId}</strong>
                      <small>{formatDate(booking.createdAt)}</small>
                    </td>

                    <td>
                      <strong>{booking.name}</strong>
                      <small>{booking.email}</small>
                      <small>{booking.phone}</small>
                    </td>

                    <td>
                      {booking.roomId?.name || booking.roomType || "-"}
                    </td>

                    <td>
                      <strong>{formatDate(booking.checkIn)}</strong>
                      <small>to</small>
                      <strong>{formatDate(booking.checkOut)}</strong>
                      <small>{booking.guests} guests</small>
                    </td>

                    <td>
                      {booking.actualCheckInAt
                        ? formatDateTime(booking.actualCheckInAt)
                        : <small>Not checked in</small>}
                    </td>

                    <td>
                      {booking.actualCheckOutAt
                        ? formatDateTime(booking.actualCheckOutAt)
                        : <small>Not checked out</small>}
                    </td>

                    <td>
                      <span
                        className={
                          booking.paymentStatus === "received"
                            ? "payment received"
                            : "payment pending"
                        }
                      >
                        {booking.paymentStatus === "received"
                          ? "Received"
                          : "Pending"}
                      </span>
                    </td>

                    <td>
                      <span className={`status ${booking.status}`}>
                        {getStatusLabel(booking.status)}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-button"
                        type="button"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {paginatedBookings.length === 0 && (
                  <tr>
                    <td colSpan="9" className="empty-table">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredBookings.length > BOOKINGS_PER_PAGE && (
            <div className="booking-pagination">
              <button
                type="button"
                className="pagination-button"
                disabled={safeCurrentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
              >
                ← Previous
              </button>

              <div className="pagination-pages">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={
                      `pagination-number ${
                        safeCurrentPage === page ? "active" : ""
                      }`
                    }
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="pagination-button"
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
              >
                Next →
              </button>
            </div>
          )}
        </section>
      </main>

      {/* BOOKING DETAILS MODAL */}

      {selectedBooking && (
        <div
          className="admin-modal-overlay"
          onClick={() =>
            !actionLoading && setSelectedBooking(null)
          }
        >
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              disabled={actionLoading}
              onClick={() => setSelectedBooking(null)}
            >
              ×
            </button>

            <div className="modal-heading">
              <div>
                <span>Booking Details</span>
                <h2>{selectedBooking.bookingId}</h2>
              </div>

              <span className={`status ${selectedBooking.status}`}>
                {getStatusLabel(selectedBooking.status)}
              </span>
            </div>

            <div className="details-grid">
              <div>
                <label>Customer</label>
                <strong>{selectedBooking.name}</strong>
              </div>

              <div>
                <label>Email</label>
                <strong>{selectedBooking.email}</strong>
              </div>

              <div>
                <label>Phone</label>
                <strong>{selectedBooking.phone}</strong>
              </div>

              <div>
                <label>Cottage</label>
                <strong>
                  {selectedBooking.roomId?.name ||
                    selectedBooking.roomType ||
                    "-"}
                </strong>
              </div>

              <div>
                <label>Reserved Check-in</label>
                <strong>{formatDate(selectedBooking.checkIn)}</strong>
              </div>

              <div>
                <label>Reserved Check-out</label>
                <strong>{formatDate(selectedBooking.checkOut)}</strong>
              </div>

              <div>
                <label>Guests</label>
                <strong>{selectedBooking.guests}</strong>
              </div>

              <div>
                <label>Payment</label>
                <strong
                  className={
                    selectedBooking.paymentStatus === "received"
                      ? "text-success"
                      : "text-warning"
                  }
                >
                  {selectedBooking.paymentStatus === "received"
                    ? "Received"
                    : "Pending"}
                </strong>
              </div>

              <div>
                <label>Actual Check-in</label>
                <strong>
                  {formatDateTime(selectedBooking.actualCheckInAt)}
                </strong>
              </div>

              <div>
                <label>Actual Check-out</label>
                <strong>
                  {formatDateTime(selectedBooking.actualCheckOutAt)}
                </strong>
              </div>
            </div>

            {/* STAY TRACKING */}

            <div className="message-box">
              <label>Stay Tracking</label>

              <p>
                <strong>Reserved:</strong>{" "}
                {formatDate(selectedBooking.checkIn)} →{" "}
                {formatDate(selectedBooking.checkOut)}
              </p>

              <p>
                <strong>Actual Check-in:</strong>{" "}
                {formatDateTime(selectedBooking.actualCheckInAt)}
              </p>

              <p>
                <strong>Actual Check-out:</strong>{" "}
                {formatDateTime(selectedBooking.actualCheckOutAt)}
              </p>

              {selectedBooking.status === "confirmed" && (
                <button
                  className="confirm-button"
                  type="button"
                  disabled={actionLoading}
                  onClick={() => checkInBooking(selectedBooking._id)}
                >
                  {actionLoading ? "Processing..." : "✓ Check In Customer"}
                </button>
              )}

              {selectedBooking.status === "checked_in" && (
                <button
                  className="confirm-button"
                  type="button"
                  disabled={actionLoading}
                  onClick={() => checkOutBooking(selectedBooking._id)}
                >
                  {actionLoading ? "Processing..." : "✓ Check Out Customer"}
                </button>
              )}

              {selectedBooking.status === "checked_out" && (
                <p className="text-success">
                  ✓ Customer has checked out. Actual stay times have
                  been recorded.
                </p>
              )}
            </div>

            {/* SPECIAL REQUEST */}

            <div className="message-box">
              <label>Special Request</label>
              <p>
                {selectedBooking.message || "No special request."}
              </p>
            </div>

            {/* CANCELLATION INFORMATION */}

            {selectedBooking.status === "cancelled" && (
              <div className="payment-warning">
                <strong>Booking Cancelled</strong>

                <p>
                  <strong>Reason:</strong>{" "}
                  {selectedBooking.cancellationReason ||
                    "No reason recorded."}
                </p>

                {selectedBooking.cancelledAt && (
                  <p>
                    <strong>Cancelled At:</strong>{" "}
                    {formatDateTime(selectedBooking.cancelledAt)}
                  </p>
                )}
              </div>
            )}

            {/* PAYMENT WARNING - NO ID PROOF */}

            {selectedBooking.status === "pending" &&
              selectedBooking.paymentStatus !== "received" && (
                <div className="payment-warning">
                  <strong>Payment Required</strong>
                  <p>
                    Verify the customer's payment before confirming
                    this booking.
                  </p>
                </div>
              )}

            {/* PAYMENT ACTION */}

            {selectedBooking.status !== "cancelled" &&
              selectedBooking.paymentStatus !== "received" && (
                <div className="message-box">
                  <label>Payment Verification</label>

                  <p>
                    Current payment status: <strong>Pending</strong>
                  </p>

                  <button
                    className="confirm-button"
                    type="button"
                    disabled={actionLoading}
                    onClick={() =>
                      markPaymentReceived(selectedBooking._id)
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
              {selectedBooking.status === "pending" && (
                <button
                  className="confirm-button"
                  type="button"
                  disabled={
                    actionLoading ||
                    selectedBooking.paymentStatus !== "received"
                  }
                  onClick={() => confirmBooking(selectedBooking._id)}
                >
                  {actionLoading
                    ? "Processing..."
                    : "✓ Confirm Booking"}
                </button>
              )}

              {selectedBooking.status !== "cancelled" &&
                selectedBooking.status !== "checked_out" && (
                  <button
                    className="cancel-button"
                    type="button"
                    disabled={actionLoading}
                    onClick={() => cancelBooking(selectedBooking._id)}
                  >
                    Cancel Booking
                  </button>
                )}
            </div>

            {/* PAYMENT REQUIREMENT */}

            {selectedBooking.status === "pending" &&
              selectedBooking.paymentStatus !== "received" && (
                <div
                  className="payment-warning"
                  style={{ marginTop: "12px" }}
                >
                  <strong>Booking cannot be confirmed yet.</strong>
                  <p>Please mark the payment as received first.</p>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
