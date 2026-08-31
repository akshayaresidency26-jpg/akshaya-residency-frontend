import banner from "../Images/img-8.jpeg";
import "../Css/Contact.css";

function ContactBanner() {
  return (
    <section
      className="contact-banner"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="overlay">
        <div className="container">
          <h1>Contact Us</h1>
        </div>
      </div>
    </section>
  );
}

export default ContactBanner;