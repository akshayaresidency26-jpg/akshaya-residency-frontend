import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhoneAlt
} from "react-icons/fa";

function ContactInfo() {
  return (
    <>

      <div className="contact-card d-flex">

        <div className="icon">
          <FaMapMarkerAlt />
        </div>

        <div>
          <h4>ADDRESS</h4>

          <p>
            Akshaya Residency<br />
            Courtallam,
            Tenkasi District,
            Tamil Nadu - 627802.
          </p>

        </div>

      </div>

      <div className="contact-card d-flex">

        <div className="icon">
          <FaCalendarAlt />
        </div>

        <div>
          <h4>ROOM BOOKING</h4>

          {/* <p>
            info@akshayaresidency.com
          </p> */}

          <p>
            zankrapet@gmail.com
          </p>

        </div>

      </div>

      {/* <div className="contact-card d-flex">

        <div className="icon">
          <FaHotel />
        </div>

        <div>

          <h4>HOTEL</h4>

          <p>
            +91 9715172185
          </p>

          <p>
            +91 9715172185
          </p>

        </div>

      </div> */}

      <div className="contact-card d-flex">

        <div className="icon">
          <FaPhoneAlt />
        </div>

        <div>

          <h4>RECEPTION</h4>

          <p>
            +91 9715172185
          </p>

        </div>

      </div>

    </>
  );
}

export default ContactInfo;