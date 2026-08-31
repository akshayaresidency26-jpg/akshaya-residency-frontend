import { Link } from "react-router-dom";
import "../Css/About.css"

function AboutUs() {
  return (
    <section className="about-us py-5">

      <div className="container">

        <div className="text-center">

          <h2 className="fw-bold">
            About Us
          </h2>

          <h4 className="text-secondary mb-4">
            Experience Comfort, Hospitality & Nature
          </h4>

          <p className="about-text">
            Welcome to <strong>Akshaya Residency</strong>, your trusted destination
            for a comfortable and memorable stay in the heart of Courtallam.
            Surrounded by the natural beauty of the Western Ghats and located
            close to the famous waterfalls, our residency provides the perfect
            combination of modern comfort, peaceful surroundings, and genuine
            hospitality.
          </p>

          <p className="about-text mt-3">
            Whether you are travelling with your family, friends, or on a
            business trip, we ensure every guest enjoys spacious rooms,
            excellent service, modern amenities, and a relaxing atmosphere.
            Our dedicated team works hard to make every stay pleasant,
            comfortable, and unforgettable.
          </p>

          <p className="about-text mt-3">
            At Akshaya Residency, we believe every journey deserves a perfect
            place to stay. We are committed to providing exceptional service,
            clean accommodation, and warm hospitality while helping our guests
            experience the beauty and charm of Courtallam.
          </p>

          <blockquote className="about-quote mt-5">
            "Where every stay begins with comfort and ends with unforgettable memories."
          </blockquote>

          <Link to="/explore" className="btn btn-warning mt-4 px-4 py-2">
                Explore More
          </Link>

        </div>

      </div>

    </section>
  );
}

export default AboutUs;