import { FaMapMarkerAlt, FaCalendarAlt, FaPhoneAlt} from "react-icons/fa";

function ContactInfo() {
  return (
    <div className="contact-info-list">

      {/* Address */}
      <div className="contact-card">

        <div className="contact-card-icon">
          <FaMapMarkerAlt />
        </div>

        <div className="contact-card-content">

          <span>VISIT US</span>

          <h4>Our Address</h4>

          <p>
            Akshaya Residency<br />
            Courtallam,<br />
            Tenkasi District,<br />
            Tamil Nadu - 627802.
          </p>

          <a
            href="https://maps.app.goo.gl/BWEoFHMfWNaHyXQ18?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card-link"
          >
            View on Google Maps →
          </a>

        </div>

      </div>


      {/* Booking */}
      <div className="contact-card">

        <div className="contact-card-icon">
          <FaCalendarAlt />
        </div>

        <div className="contact-card-content">

          <span>RESERVATIONS</span>

          <h4>Room Booking</h4>

          <p>
            For room availability and booking enquiries,
            get in touch with our team.
          </p>

          <a
            href="mailto:zankarpet@gmail.com"
            className="contact-card-link"
          >
            zankarpet@gmail.com →
          </a>

        </div>

      </div>

      {/* Phone */}
      <div className="contact-card">

        <div className="contact-card-icon">
          <FaPhoneAlt />
        </div>

        <div className="contact-card-content">

          <span>RECEPTION</span>

          <h4>Call Us</h4>

          <p>
            Speak directly with our reception team
            for assistance and enquiries.
          </p>

          <a
            href="tel:+919715172185"
            className="contact-card-link"
          >
            +91 9715172185 →
          </a>

        </div>

      </div>

    </div>
  );
}

export default ContactInfo;