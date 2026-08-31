import banner from "../Images/img-1.jpeg";
import "../Css/Explore.css";

function ExploreBanner() {
  return (
    <section
      className="explore-banner"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="explore-overlay">
        <h1 className="text-center explore mt-3">Explore Courtallam</h1>
      </div>
    </section>
  );
}

export default ExploreBanner;