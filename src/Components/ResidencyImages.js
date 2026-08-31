import img1 from "../Images/img-1.jpeg";
import img2 from "../Images/img-4.jpeg";
import img3 from "../Images/img-11.jpeg";
import img4 from "../Images/img-14.jpeg";
import img5 from "../Images/img-8.jpeg";
import img6 from "../Images/img-15.jpeg";

import "../Css/Rooms.css";

function ResidencyImages() {
  return (
    <section className="residency-gallery py-5">

      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Residency Images</h2>
          <p className="text-muted">
            Explore the beautiful surroundings and comfortable spaces of Akshaya Residency.
          </p>
        </div>

        <div className="row">

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="gallery-card">
              <img src={img1} alt="" className="gallery-img" />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="gallery-card">
              <img src={img2} alt="" className="gallery-img" />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="gallery-card">
              <img src={img3} alt="" className="gallery-img" />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="gallery-card">
              <img src={img4} alt="" className="gallery-img" />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="gallery-card">
              <img src={img5} alt="" className="gallery-img" />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="gallery-card">
              <img src={img6} alt="" className="gallery-img" />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default ResidencyImages;