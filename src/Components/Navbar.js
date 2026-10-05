import { Link, useLocation } from "react-router-dom";
import "../Css/Navbar.css";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="akshaya-navbar navbar navbar-expand-lg sticky-top">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand akshaya-brand" to="/">
        <span className="akshaya-logo">
          <span className="logo-roof"></span>
          <span className="logo-letter">A</span>
        </span>

        <span className="akshaya-brand-name">
          <span className="brand-main">Akshaya</span>
          <span className="brand-sub">RESIDENCY</span>
        </span>
      </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler akshaya-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link
                className={`nav-link akshaya-nav-link ${
                  isActive("/") ? "active" : ""
                }`}
                to="/"
                onClick={() => window.scrollTo(0, 0)}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link akshaya-nav-link ${
                  isActive("/about") ? "active" : ""
                }`}
                to="/about"
                onClick={() => window.scrollTo(0, 0)}
              >
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link akshaya-nav-link ${
                  isActive("/rooms") ? "active" : ""
                }`}
                to="/rooms"
                onClick={() => window.scrollTo(0, 0)}
              >
                Rooms
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link akshaya-nav-link ${
                  isActive("/explore") ? "active" : ""
                }`}
                to="/explore"
                onClick={() => window.scrollTo(0, 0)}
              >
               Attractions
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link akshaya-nav-link ${
                  isActive("/tours-travels") ? "active" : ""
                }`}
                to="/tours-travels"
                onClick={() => window.scrollTo(0, 0)}
              >
                Tours & Travels
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link akshaya-nav-link ${
                  isActive("/contact") ? "active" : ""
                }`}
                to="/contact"
                onClick={() => window.scrollTo(0, 0)}
              >
                Contact
              </Link>
            </li>

            {/* Book Now */}
            <li className="nav-item booking-nav-item">
              <Link
                to="/booking"
                onClick={() => window.scrollTo(0, 0)}
                className="navbar-book-btn"
              >
                <span>Book Now</span>
                <span className="navbar-book-arrow">→</span>
              </Link>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;