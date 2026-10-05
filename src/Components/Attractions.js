import Slider from "react-slick";
import { Link } from "react-router-dom";
import img1 from "../Images/coutrallam-five falls.jpg";
import img2 from "../Images/Tenkasi-Kasi vishwanathar temple.jpg";
import img3 from "../Images/coutrallm-tiger-falls.webp";
import img4 from "../Images/Courtallam - Main falls.jpg";
import img5 from "../Images/coutrallam-shenbahadevi falls.avif";
import img6 from "../Images/Tenkasi-Thirumali kovil.jpg";

function Attractions() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3200,
    pauseOnHover: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const attractions = [
    {
      image: img1,
      title: "Five Falls",
      location: "Courtallam",
    },
    {
      image: img2,
      title: "Kasi Vishwanathar Temple",
      location: "Tenkasi",
    },
    {
      image: img3,
      title: "Tiger Falls",
      location: "Courtallam",
    },
    {
      image: img4,
      title: "Main Falls",
      location: "Courtallam",
    },
    {
      image: img5,
      title: "Shenbaga Devi Falls",
      location: "Courtallam",
    },
    {
      image: img6,
      title: "Thirumalai Kumarasamy Temple",
      location: "Tenkasi",
    },
  ];

  return (
    <section className="attractions-section">

      <div className="container">

        {/* Section Heading */}
        <div className="attractions-heading">

          <span className="attractions-subtitle">
            Discover the Destination
          </span>

          <h2>
            Explore <span>Courtallam</span>
          </h2>

          <p>
            Discover breathtaking waterfalls, ancient temples and
            beautiful places around Courtallam and Tenkasi.
          </p>

          <div className="heading-line"></div>

        </div>

        {/* Carousel */}
        <div className="attractions-slider">

          <Slider {...settings}>

            {attractions.map((place, index) => (
              <div className="attraction-slide" key={index}>

                <div className="attraction-card">

                  <div className="attraction-image">

                    <img src={place.image}  alt={place.title} />

                    <div className="attraction-overlay"></div>

                    <div className="attraction-content">

                      <span className="attraction-location">
                        📍 {place.location}
                      </span>

                      <h3>{place.title}</h3>

                      <span className="discover-text">
                        Discover Place →
                      </span>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </Slider>

          <div className="attractions-more">
            <Link
              to="/explore"
              onClick={() => window.scrollTo(0, 0)}
              className="courtallam-explore-button"
            >
              Explore More
              <span>→</span>
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Attractions;