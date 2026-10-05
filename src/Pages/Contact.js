import Navbar from "../Components/Navbar";
import ContactInfo from "../Components/ContactInfo";
import GoogleMap from "../Components/GoogleMap";
import Footer from "../Components/Footer";
import "../Css/Contact.css";

function Contact() {
  return (
    <>
      <Navbar />

      <section className="contact-hero">

        <div className="contact-hero-overlay"></div>

        <div className="container">

          <div className="contact-hero-content">

            <span className="contact-hero-subtitle">
              We Would Love To Hear From You
            </span>

            <h1>
              Get In <span>Touch</span>
            </h1>

            <p>
              Planning a relaxing stay in Courtallam?
              Reach out to Akshaya Residency and let us
              help make your visit comfortable and memorable.
            </p>

            <div className="contact-hero-line"></div>

          </div>

        </div>

      </section>

      <main className="contact-page">

        <div className="container">

          <div className="contact-intro">

            <span>CONTACT AKSHAYA RESIDENCY</span>

            <h2>
              Your Stay Begins <em>Here</em>
            </h2>

            <p>
              Whether you are planning a family vacation, a peaceful
              weekend getaway or a visit to the beautiful Courtallam
              waterfalls, our team is here to assist you.
            </p>

          </div>


          <div className="contact-layout">

            {/* Contact Information */}
            <div className="contact-info-wrapper">

              <ContactInfo />

            </div>

            <div className="contact-cta-card">

              <div className="contact-cta-number">
                24/7
              </div>

              <span className="contact-cta-small">
                RESERVATIONS & ASSISTANCE
              </span>

              <h3>
                Have questions about
                your stay?
              </h3>

              <p>
                Our team is happy to help you with room bookings,
                directions, availability and any information you
                need before your visit.
              </p>

              <a
                href="tel:+919715172185"
                className="contact-call-btn"
              >
                <span>Call +91 9715172185</span>
              </a>

            </div>

          </div>


          <div className="contact-actions">

            <a
              href="tel:+919715172185"
              className="contact-action"
            >
              <span className="contact-action-icon">
                ☎
              </span>

              <div>
                <small>CALL US</small>
                <strong>+91 9715172185</strong>
              </div>
            </a>


            <a
              href="mailto:zankarpet@gmail.com"
              className="contact-action"
            >
              <span className="contact-action-icon">
                ✉
              </span>

              <div>
                <small>EMAIL US</small>
                <strong>zankarpet@gmail.com</strong>
              </div>
            </a>


            <a
              href="https://maps.app.goo.gl/BWEoFHMfWNaHyXQ18?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action"
            >
              <span className="contact-action-icon">
                📍
              </span>

              <div>
                <small>FIND US</small>
                <strong>View Location</strong>
              </div>
            </a>

          </div>


          <section className="contact-map-section">

            <div className="contact-map-heading">

              <div>

                <span>
                  FIND US IN COURTALLAM
                </span>

                <h2>
                  Come <em>Visit Us</em>
                </h2>

              </div>

              <a
                href="https://maps.app.goo.gl/BWEoFHMfWNaHyXQ18?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="map-directions-btn"
              >
                Get Directions →
              </a>

            </div>


            <div className="contact-map-wrapper">

              <GoogleMap />

            </div>

          </section>


          <section className="arrival-section">

            <div className="arrival-content">

              <span>
                PLAN YOUR JOURNEY
              </span>

              <h2>
                Easy Access. Peaceful Stay.
              </h2>

              <p>
                Akshaya Residency is conveniently located in
                Courtallam, making it easy to explore the region's
                waterfalls, temples and natural attractions.
              </p>

            </div>


            <div className="arrival-points">

              <div className="arrival-point">
                <span>01</span>
                <div>
                  <strong>Easy Location</strong>
                  <p>
                    Conveniently located in the Courtallam area.
                  </p>
                </div>
              </div>


              <div className="arrival-point">
                <span>02</span>
                <div>
                  <strong>Local Attractions</strong>
                  <p>
                    Explore waterfalls and temples nearby.
                  </p>
                </div>
              </div>


              <div className="arrival-point">
                <span>03</span>
                <div>
                  <strong>Warm Hospitality</strong>
                  <p>
                    A comfortable base for your Courtallam visit.
                  </p>
                </div>
              </div>

            </div>

          </section>

        </div>

      </main>


      <Footer />
    </>
  );
}

export default Contact;