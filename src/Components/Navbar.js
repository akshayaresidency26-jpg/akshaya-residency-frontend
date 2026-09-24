import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          Akshaya Residency
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/rooms">
                Rooms
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/explore">
                Gallery
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            <li className="nav-item ms-2">
              <Link
                to="/booking"
                className="btn btn-warning"
              >
                Book Now
              </Link>
              
            </li>
            <li className="nav-item">
              <Link className="nav-item btn btn-warning ms-2" to="/admin/login">
                 Admin Login
              </Link>
              
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;