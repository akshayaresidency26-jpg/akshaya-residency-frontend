import footerBg from "../Images/img-8.jpeg";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section
        className="footer-banner text-white text-center mt-5 mb-1"
        style={{
          backgroundImage: `url(${footerBg})`,
        }}
      >
        <div className="overlay">
          <div className="container">

            <h2>Ready to Make Memories?</h2>

            <h1>Your Perfect Stay Awaits at Akshaya Residency!</h1>

            <Link to="/booking" className="btn btn-danger btn-lg mt-3">
                Book Now
            </Link>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">

        <div className="container">

          <div className="row">

            {/* About */}
            <div className="col-lg-4 col-md-6 mb-4 mt-4">

              <p>
                Akshaya Residency offers a comfortable and memorable stay in
                the heart of Courtallam. Located close to the famous waterfalls,
                our Cottage combines modern amenities with warm hospitality,
                making every visit relaxing and enjoyable.
              </p>

            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-6 mb-4">

              <h3>Contact Details</h3>
{/* 
              <p>
                <FaMapMarkerAlt className="me-2 text-danger" />
                <strong>Akshaya Residency</strong>
              </p> */}

              <p>
                <FaMapMarkerAlt className="me-2 text-danger" />
                68/1,Sengottai Road,
                <br />
                Coutrallam,Tenkasi,
                <br />
                Tamil Nadu.
              </p>

              <p>
                <FaPhoneAlt className="me-2 text-danger" />
                +91 9715172185
              </p>

              <p>
                <FaEnvelope className="me-2 text-danger" />
                zankarpet@gmail.com
              </p>

            </div>

            {/* Quick Links */}
            <div className="col-lg-3 col-md-6 mb-4">

              <h3>Quick Links</h3>

              <ul className="footer-links">

                <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="footer-link">
                  Home
                </Link></li>

                <li><Link to="/rooms" onClick={() => window.scrollTo(0, 0)} className="footer-link">
                  Rooms
                </Link></li>

                <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="footer-link">
                  About
                </Link></li>

                {/* <li>Facilities</li> */}

                {/* <li>Nearby Attractions</li> */}
                {/* <Link to="/explore" className="footer-link">
                      Nearby Attractions
                </Link> */}
                <li><Link to="/explore" onClick={() => window.scrollTo(0, 0)} className="footer-link">
                  Nearby Attractions
                </Link></li>

                <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="footer-link">
                  Contact
                </Link></li>

              </ul>

            </div>

            {/* Policies */}
            <div className="col-lg-2 col-md-6 mb-4">

              <h3>More</h3>

              <ul className="footer-links">

                <li>Stay connected with us on social media for updates and special offers.</li>

                <li>Facebook</li>

                <li>Instagram</li>

                <li>Twitter</li>

              </ul>

            </div>

          </div>

          <hr />

          <div className="text-center">

            © 2026 Akshaya Residency | All Rights Reserved

          </div>

        </div>

      </footer>
    </>
  );
}

export default Footer;