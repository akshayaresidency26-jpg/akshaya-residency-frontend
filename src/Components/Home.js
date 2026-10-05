import { Link } from "react-router-dom";
import homeImage from "../Images/home_page.png";
import "../Css/Home.css";

function Home() {
  const highlights = [
    {
      icon: "🏨",
      title: "Comfortable Stay",
      text: "Relax in a peaceful and comfortable environment designed for families, couples and travelers.",
    },
    {
      icon: "📍",
      title: "Great Location",
      text: "Stay conveniently in Courtallam while keeping popular attractions within easy reach.",
    },
    {
      icon: "🌿",
      title: "Explore Courtallam",
      text: "Enjoy waterfalls, temples, nature and the beautiful surroundings of the Western Ghats.",
    },
  ];

  const places = [
    {
      icon: "💧",
      title: "Courtallam Falls",
      text: "Experience the famous waterfalls and refreshing natural surroundings of Courtallam.",
    },
    {
      icon: "🛕",
      title: "Historic Temples",
      text: "Discover beautiful temples and the rich spiritual heritage of the Tirunelveli region.",
    },
    {
      icon: "🌄",
      title: "Western Ghats",
      text: "Explore scenic landscapes, greenery and peaceful destinations around the Western Ghats.",
    },
    {
      icon: "🚕",
      title: "Tours & Travels",
      text: "Plan comfortable sightseeing trips and travel around Tirunelveli and Tenkasi.",
    },
  ];

  return (
    <>
      <main className="home-page">

            {/* HERO */}
            
        <section
          className="home-hero"
          style={{ backgroundImage: `url(${homeImage})` }}
        >
          <div className="home-hero-overlay">
            <div className="home-hero-content">

              <span className="home-eyebrow">
                AKSHAYA RESIDENCY
              </span>

              <h1>
                Your Comfortable Stay in Courtallam
              </h1>

              <h2>
                Relax. Stay. Explore.
              </h2>

              <p>
                Experience a comfortable and peaceful stay in Courtallam,
                surrounded by nature, waterfalls, temples and the beauty
                of the Western Ghats.
              </p>

              <div className="home-hero-buttons">
                <Link
                  to="/booking"
                  className="home-primary-button"
                >
                  Book Your Stay
                </Link>

                <Link
                  to="/rooms"
                  className="home-secondary-button"
                >
                  Explore Our Rooms
                </Link>
              </div>

            </div>
          </div>
        </section>

            {/* WELCOME */}

        <section className="home-welcome section-padding">

          <div className="home-container">

            <div className="home-section-heading center">

              <span>
                WELCOME TO AKSHAYA RESIDENCY
              </span>

              <h2>
                A Peaceful Place to Stay in Courtallam
              </h2>

              <p>
                Whether you are visiting Courtallam for its famous
                waterfalls, exploring nearby temples or travelling
                through Tirunelveli and Tenkasi, Akshaya Residency
                gives you a comfortable place to relax and recharge.
              </p>

            </div>

            <div className="home-highlight-grid">

              {highlights.map((item) => (
                <article
                  className="home-highlight-card"
                  key={item.title}
                >
                  <div className="home-highlight-icon">
                    {item.icon}
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>
                </article>
              ))}

            </div>

          </div>

        </section>

            {/* ABOUT / EXPERIENCE */}

        <section className="home-experience section-padding">

          <div className="home-container">

            <div className="home-experience-grid">

              <div className="home-experience-content">

                <span className="home-small-title">
                  EXPERIENCE COURTALLAM
                </span>

                <h2>
                  Stay Close to Nature &amp; Discover More
                </h2>

                <p>
                  Courtallam is known for its beautiful waterfalls,
                  refreshing surroundings and scenic Western Ghats.
                  Akshaya Residency provides a convenient base for
                  enjoying the region at your own pace.
                </p>

                <p>
                  Start your day exploring local attractions and
                  return to a comfortable place where you can relax
                  after your journey.
                </p>

                <div className="home-experience-points">

                  <div>
                    <span>✓</span>
                    <strong>Peaceful surroundings</strong>
                  </div>

                  <div>
                    <span>✓</span>
                    <strong>Suitable for families &amp; travelers</strong>
                  </div>

                  <div>
                    <span>✓</span>
                    <strong>Convenient base for sightseeing</strong>
                  </div>

                </div>

                <Link to="/rooms" className="home-brown-button" >
                  View Accommodation
                </Link>

              </div>


              <div className="home-experience-card">

                <div className="home-experience-card-icon">
                  🌿
                </div>

                <span>
                  DISCOVER
                </span>

                <h3>
                  The Beauty of Courtallam
                </h3>

                <p>
                  Waterfalls, greenery, temples and peaceful
                  mountain landscapes are waiting to be explored.
                </p>

                <Link to="/tours-travels" className="home-card-link" >
                  Explore Tours &amp; Travels →
                </Link>

              </div>

            </div>

          </div>

        </section>

            {/* ROOMS */}

        <section className="home-rooms section-padding">

          <div className="home-container">

            <div className="home-section-heading center">

              <span>
                STAY WITH US
              </span>

              <h2>
                Comfort for Your Journey
              </h2>

              <p>
                Choose a comfortable stay at Akshaya Residency
                and make Courtallam your base for exploring the region.
              </p>

            </div>

            <div className="home-room-feature">

              <div className="home-room-visual">
                <div className="home-room-visual-icon">
                  🛏️
                </div>

                <span>
                  AKSHAYA RESIDENCY
                </span>

                <h3>
                  Your Home Away From Home
                </h3>
              </div>

              <div className="home-room-content">

                <span className="home-small-title">
                  COMFORT &amp; RELAXATION
                </span>

                <h3>
                  A Relaxing Stay After a Day of Exploring
                </h3>

                <p>
                  After visiting waterfalls, temples and nearby
                  destinations, enjoy a comfortable place to rest
                  and recharge.
                </p>

                <div className="home-room-features">

                  <div>
                    <span>🛏️</span>
                    <strong>Comfortable Rooms</strong>
                  </div>

                  <div>
                    <span>👨‍👩‍👧‍👦</span>
                    <strong>Family Friendly</strong>
                  </div>

                  <div>
                    <span>📍</span>
                    <strong>Courtallam Location</strong>
                  </div>

                  <div>
                    <span>🌿</span>
                    <strong>Peaceful Stay</strong>
                  </div>

                </div>

                <Link to="/rooms" className="home-brown-button" >
                  View Rooms
                </Link>

              </div>

            </div>

          </div>

        </section>

            {/* PLACES TO EXPLORE */}

        <section className="home-places section-padding">

          <div className="home-container">

            <div className="home-section-heading center">

              <span>
                EXPLORE THE REGION
              </span>

              <h2>
                Discover What&apos;s Around You
              </h2>

              <p>
                Make your stay more memorable by exploring the
                natural beauty and cultural attractions of the region.
              </p>

            </div>


            <div className="home-place-grid">

              {places.map((place) => (
                <article
                  className="home-place-card"
                  key={place.title}
                >

                  <div className="home-place-icon">
                    {place.icon}
                  </div>

                  <h3>
                    {place.title}
                  </h3>

                  <p>
                    {place.text}
                  </p>

                </article>
              ))}

            </div>


            <div className="home-places-link">
              <Link to="/tours-travels" className="home-brown-button" >
                Explore Tours &amp; Travels
              </Link>
            </div>

          </div>

        </section>

            {/* WHY CHOOSE US */}

        <section className="home-why section-padding">

          <div className="home-container">

            <div className="home-section-heading center">

              <span>
                AKSHAYA RESIDENCY
              </span>

              <h2>
                Make Your Courtallam Trip Comfortable
              </h2>

            </div>

            <div className="home-why-grid">

              <div className="home-why-card">
                <div>⭐</div>
                <h3>Comfort</h3>
                <p>
                  A relaxing place to unwind during your journey.
                </p>
              </div>

              <div className="home-why-card">
                <div>📍</div>
                <h3>Convenience</h3>
                <p>
                  A practical base for discovering Courtallam and beyond.
                </p>
              </div>

              <div className="home-why-card">
                <div>🚕</div>
                <h3>Travel Assistance</h3>
                <p>
                  Explore our Tours &amp; Travels service for local journeys.
                </p>
              </div>

              <div className="home-why-card">
                <div>🤝</div>
                <h3>Personal Service</h3>
                <p>
                  We aim to make your stay simple, comfortable and enjoyable.
                </p>
              </div>

            </div>

          </div>

        </section>

            {/* CTA */}

        <section className="home-cta">

          <div className="home-container">

            <div className="home-cta-box">

              <span>
                PLAN YOUR STAY
              </span>

              <h2>
                Ready to Experience Courtallam?
              </h2>

              <p>
                Stay at Akshaya Residency and discover the waterfalls,
                temples and beautiful destinations around Courtallam.
              </p>

              <div className="home-cta-buttons">

                <Link to="/booking" className="home-primary-button">
                  Book Your Stay
                </Link>

                <Link to="/tours-travels" className="home-secondary-button" >
                  Explore Tours
                </Link>

              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}

export default Home;