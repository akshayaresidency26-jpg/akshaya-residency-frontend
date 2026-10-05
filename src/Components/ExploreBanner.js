import banner from "../Images/img-1.jpeg";

function ExploreBanner() {
  return (
    <section
      className="explore-banner"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="explore-overlay">

        <div className="explore-banner-content">

          <span className="explore-eyebrow">
            DISCOVER • EXPERIENCE • ENJOY
          </span>

          <h1 className="explore"> Explore Courtallam </h1>

          <p> Waterfalls, temples and unforgettable experiences </p>

        </div>

      </div>
    </section>
  );
}

export default ExploreBanner;