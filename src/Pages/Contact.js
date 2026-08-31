import Navbar from "../Components/Navbar";
// import ContactBanner from "../Components/ContactBanner";
import ContactInfo from "../Components/ContactInfo";
// import ContactForm from "../Components/ContactForm";
import GoogleMap from "../Components/GoogleMap";
import Footer from "../Components/Footer";
import "../Css/Contact.css";

function Contact() {
  return (
    <>
      <Navbar />
      {/* <ContactBanner /> */}

      <div className="container py-5">
        <div className="row">

          <div className="col-lg-7">
            <ContactInfo />
          </div>

          {/* <div className="col-lg-5">
            <ContactForm />
          </div> */}

        </div>
      </div>

      <GoogleMap />

      <Footer />
    </>
  );
}

export default Contact;