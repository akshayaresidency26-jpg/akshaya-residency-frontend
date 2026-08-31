import hotelImage from "../Images/img-8.jpeg";

function Welcome() {
  return (
    <section className="welcome py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Side Image */}
          {/* <div className="col-lg-6 mb-4 mb-lg-0" image-box>
            <img
              src={hotelImage}
              alt="Akshaya Residency"
              className="img-fluid rounded shadow welcome-img"
            />
          </div> */}

          <div className=" col-lg-6 mb-4 mb-lg-0 image-box">
            <img src={hotelImage} className="welcome-img" alt="Hotel" />
          </div>

          {/* Right Side Content */}
          <div className="col-lg-6 mb-3">
            <h5 className="text-warning fw-bold">WELCOME TO</h5>

            <h2 className="fw-bold">
              Akshaya Residency
            </h2>

            <p className="text-muted">
              Akshaya Residency offers a perfect blend of comfort,
              cleanliness, and warm hospitality in the beautiful town of
              Courtallam. Whether you're visiting for a family vacation,
              business trip, or to enjoy the famous waterfalls, we ensure
              a pleasant and memorable stay.
            </p>

            <p className="text-muted">
              Our spacious rooms, modern amenities, friendly staff, and
              convenient location make us an ideal choice for travellers
              seeking relaxation and quality service.
            </p>

            <div className="row mt-2">
              <div className="col-6 mb-2">
                ✅ Luxury Rooms
              </div>

              <div className="col-6 mb-2">
                ✅ Free Wi-Fi
              </div>

              <div className="col-6 mb-2">
                ✅ Car Parking
              </div>

              <div className="col-6 mb-2">
                ✅ 24×7 Reception
              </div>
            </div>

            {/* <button className="btn btn-warning px-4 py-2 mt-2">
              Discover More
            </button> */}

          </div>

        </div>
      </div>
    </section>
  );
}

export default Welcome;