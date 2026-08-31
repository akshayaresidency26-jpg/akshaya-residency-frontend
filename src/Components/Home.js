import homeImage from "../Images/Home_img.png";
import { Link } from "react-router-dom";
// import "../Css/Home.css";

function Home() {
  return (
    <section className="home-section">

      <div className="container">

        {/* Heading */}
        <div className="text-center">

          <h1 className="home-title">
            Welcome to Akshaya Residency
          </h1>

          <p className="home-subtitle">
            Experience comfort and relaxation in the heart of Courtallam.
          </p>

        </div>

        {/* Hero Image */}
        <div className="hero-image-box">

          <img
            src={homeImage}
            alt="Akshaya Residency"
            className="hero-image"
          />

        </div>

        {/* Buttons */}
        <div className="text-center mt-5">

          <Link to="/booking" className="btn btn-outline-dark btn-lg ">
            Book Now
          </Link>

          <Link to="/rooms" className="btn btn-outline-dark btn-lg ms-2">
            View Rooms
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Home;