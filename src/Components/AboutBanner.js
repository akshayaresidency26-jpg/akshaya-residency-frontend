import banner from "../Images/Home_img.png";
import "../Css/About.css";

function AboutBanner() {
  return (
    <section
      className="about-banner"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="about-overlay">
      </div>
    </section>
  );
}

export default AboutBanner;