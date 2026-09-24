import Slider from "react-slick";

import img1 from "../Images/coutrallam-five falls.jpg";
import img2 from "../Images/Tenkasi-Kasi vishwanathar temple.jpg";
import img3 from "../Images/coutrallm-tiger-falls.webp";
import img4 from "../Images/Courtallam - Main falls.jpg";
import img5 from "../Images/coutrallam-shenbahadevi falls.avif";
import img6 from "../Images/Tenkasi-Thirumali kovil.jpg";

function Attractions() {

const settings = {
  dots: false,
  infinite: true,

  speed: 800,

  slidesToShow: 3,
  slidesToScroll: 1,

  autoplay: true,
  autoplaySpeed: 3000,

  arrows: false,

  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

  return (
    <section className="py-5 bg-light">

      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Explore Courtallam</h2>
          <p className="text-muted">
            Discover Beautiful Tourist Attractions
          </p>
        </div>

        <Slider {...settings}>

          <div className="px-2">
            <div className="place-card">
              <img src={img1} alt="" />
              <h5>Five Falls, Coutrallam</h5>
            </div>
          </div>

          <div className="px-2">
            <div className="place-card">
              <img src={img2} alt="" />
              <h5>Kasi Vishwanathar Temple, Tenkasi</h5>
            </div>
          </div>

          <div className="px-2">
            <div className="place-card">
              <img src={img3} alt="" />
              <h5>Tiger Falls</h5>
            </div>
          </div>

          <div className="px-2">
            <div className="place-card">
              <img src={img4} alt="" />
              <h5>Main Falls</h5>
            </div>
          </div>

          <div className="px-2">
            <div className="place-card">
              <img src={img5} alt="" />
              <h5>shenbahadevi Falls</h5>
            </div>
          </div>

          <div className="px-2">
            <div className="place-card">
              <img src={img6} alt="" />
              <h5>Thirumalai Kumarasamy Temple</h5>
            </div>
          </div>

        </Slider>

      </div>

    </section>
  );
}

export default Attractions;