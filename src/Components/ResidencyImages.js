import img1 from "../Images/img-1.jpeg";
import img2 from "../Images/img-4.jpeg";
import img3 from "../Images/img-11.jpeg";
import img4 from "../Images/img-14.jpeg";
import img5 from "../Images/img-8.jpeg";
import img6 from "../Images/img-15.jpeg";

import "../Css/Rooms.css";

function ResidencyImages() {

  const images = [
    {
      image: img1,
      title: "Akshaya Residency",
    },
    {
      image: img2,
      title: "Comfortable Stay",
    },
    {
      image: img3,
      title: "Relax & Unwind",
    },
    {
      image: img4,
      title: "Peaceful Surroundings",
    },
    {
      image: img5,
      title: "Memorable Moments",
    },
    {
      image: img6,
      title: "Your Stay Awaits",
    },
  ];

  return (
    <section className="residency-gallery">

      <div className="container">

        {/* Gallery Heading */}
        <div className="gallery-heading">

          <span className="gallery-subtitle">
            A Glimpse Of Your Stay
          </span>

          <h2>
            Residency <span>Gallery</span>
          </h2>

          <p>
            Explore the comfortable spaces and peaceful surroundings
            that make Akshaya Residency a relaxing place to stay.
          </p>

          <div className="gallery-heading-line"></div>

        </div>


        {/* Gallery */}
        <div className="residency-grid">

          {images.map((item, index) => (

            <div
              className={`gallery-card gallery-card-${index + 1}`}
              key={index}
            >

              <img
                src={item.image}
                alt={item.title}
                className="gallery-img"
              />

              <div className="gallery-overlay">

                <div className="gallery-content">

                  <span>
                    0{index + 1}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ResidencyImages;