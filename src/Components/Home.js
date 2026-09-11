import homeImage from "../Images/home_page.png";
import { Link } from "react-router-dom";
// import "../Css/Home.css";

function Home() {
  return (
    <section
      className="home-section"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      {/* Dark overlay */}
      <div className="home-overlay"></div>

      {/* Hero Content */}
      <div className="container home-content">
        <div className="text-center">

          <h1 className="home-title">
            Welcome to Akshaya Residency
          </h1>

          <p className="home-subtitle">
            Experience comfort and relaxation in the heart of Courtallam.
          </p>

          <div className="home-buttons">
            <Link to="/booking" className="home-action-btn">
              Book Now
            </Link>

            <Link to="/rooms" className="home-action-btn">
              View Rooms
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Home;