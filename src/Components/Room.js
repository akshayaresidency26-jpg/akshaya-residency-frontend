import room1 from "../Images/img-5.jpeg";
import room2 from "../Images/img-9.jpeg";
import { Link } from "react-router-dom";
import "../Css/Rooms.css";
// import ResidencyImages from "../Components/ResidencyImages";

function Rooms() {
  return (
    <section className="rooms py-5">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Akshaya Residency</h2>
          <h4 className="text-secondary">Discover Your Perfect Room</h4>
        </div>

        <div className="row">

          {/* Room 1 */}
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow room-card">
              <img
                src={room1}
                className="card-img-top"
                alt="Deluxe Room"
              />

              <div className="card-body text-center">
                {/* <h4>Deluxe Room</h4> */}

                <button className="btn btn-warning mt-2">
                  <Link className="nav-link" to="/rooms">
                    View Details
                  </Link>                 
                </button>
              </div>
            </div>
          </div>

          {/* Room 2 */}
          <div className="col-md-6 mb-4">
            <div className="card border-0 shadow room-card">
              <img
                src={room2}
                className="card-img-top"
                alt="Family Room"
              />

              <div className="card-body text-center">
                {/* <h4>Family Room</h4> */}

                <button className="btn btn-warning mt-2">
                  <Link className="nav-link" to="/rooms">
                    View Details
                  </Link>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Rooms;