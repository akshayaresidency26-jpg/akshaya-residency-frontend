import { Link } from "react-router-dom";

function Courtallam() {
  return (
    <section className="courtallam py-5">
      <div className="container">

        <div className="text-center">

          <h2 className="fw-bold">About Courtallam</h2>

          <h4 className="text-secondary mb-4">
            Your Perfect Gateway to Nature
          </h4>

          <p className="courtallam-text">
            Courtallam, often referred to as the "Spa of South India," is one
            of Tamil Nadu's most loved tourist destinations, famous for its
            refreshing waterfalls, pleasant climate, and lush green
            surroundings. Visitors from across the country come here to
            experience the healing waters, breathtaking natural beauty, and
            peaceful atmosphere. Whether you're seeking relaxation, adventure,
            or quality time with your loved ones, Courtallam offers a memorable
            escape filled with scenic landscapes, cultural heritage, delicious
            local cuisine, and unforgettable experiences. Staying at Akshaya
            Residency places you close to the town's major attractions, making
            it the perfect base to explore everything this beautiful destination
            has to offer.
          </p>

          <Link to="/explore" className="btn btn-warning mt-4 px-4 py-2">
                Explore More
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Courtallam;