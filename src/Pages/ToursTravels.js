import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Css/ToursTravels.css";

function ToursTravels() {
  const tours = [
    {
      title: "Nava Kayilayam",
      icon: "🛕",
      duration: "2 Days",
      price: "₹5,000 / day",
      description:
        "Nava Kayilayam is a group of nine sacred Shiva temples located along the course of the Thamiraparani River in Tamil Nadu. These temples are deeply associated with Tamil Shaivism and the spiritual heritage of the region.",
      note: "Pickup from Tirunelveli or Tenkasi",
    },
    {
      title: "Nava Tirupathi",
      icon: "🙏",
      duration: "2 Days",
      price: "₹5,000 / day",
      description:
        "The Nava Tirupathi temples are a group of nine revered Vishnu temples located along the banks of the Thamiraparani River in Tirunelveli district. They are important pilgrimage destinations and part of the 108 Divya Desams.",
      note: "Pickup from Tirunelveli or Tenkasi",
    },
    {
      title: "Tiruchendur",
      icon: "🌊",
      duration: "2 Days",
      price: "₹5,000 / day",
      description:
        "Visit the famous Tiruchendur Murugan Temple, one of the six sacred abodes of Lord Murugan. The temple is particularly special because it is located beside the sea.",
      note: "Pickup from Tirunelveli or Tenkasi",
    },
  ];

  const places = [
    {
      title: "Agasthiyar Falls",
      icon: "💧",
      description:
        "A beautiful natural waterfall nestled in the lush Western Ghats of Tirunelveli district. Surrounded by greenery and flowing streams, it is a peaceful destination for nature lovers.",
    },
    {
      title: "Courtallam Falls",
      icon: "🌿",
      description:
        "Known as the 'Spa of South India', Courtallam is one of Tamil Nadu's famous waterfall destinations, surrounded by the scenic Western Ghats.",
    },
    {
      title: "Brahmadesam Temple",
      icon: "🛕",
      description:
        "Brahmadesam Kailasanathar Temple is a historic Shiva temple known for its traditional architecture, stone carvings and rich heritage.",
    },
    {
      title: "Papanasam Temple",
      icon: "🙏",
      description:
        "Papanasam Sivan Temple is a historic and spiritually significant temple near the foothills of the Western Ghats, dedicated to Lord Siva as Papanasanathar.",
    },
    {
      title: "Ambasamudram Wooden Toys",
      icon: "🧸",
      description:
        "Ambasamudram is also known for traditional wooden toy manufacturing. Visitors can explore locally made eco-friendly wooden toys.",
    },
  ];

  const features = [
    {
      icon: "⭐",
      title: "Unforgettable Experiences",
      text: "Creating memories that last a lifetime.",
    },
    {
      icon: "🤝",
      title: "Exceptional Service",
      text: "Personalized attention to every detail.",
    },
    {
      icon: "📍",
      title: "Local Expertise",
      text: "Local knowledge to help you discover the region.",
    },
    {
      icon: "🛡️",
      title: "Reliability & Safety",
      text: "Professional and safety-focused travel services.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="tours-page">

        <section className="tour-hero">
          <div className="tour-hero-overlay">
            <div className="tour-hero-content">

              <span className="tour-eyebrow">
                AKSHAYA RESIDENCY
              </span>

              <h1>
                Tours &amp; Travels
              </h1>

              <h2>
                Explore Tirunelveli, Tenkasi &amp; Beyond
              </h2>

              <p>
                Discover temples, waterfalls, heritage destinations
                and hidden gems with comfortable cab and tour
                services from Akshaya Residency.
              </p>

              <div className="tour-hero-buttons">
                <a
                  href="#tour-packages"
                  className="tour-primary-button"
                >
                  Explore Tour Packages
                </a>

                <a
                  href="#cab-rental"
                  className="tour-secondary-button"
                >
                  Cab &amp; Vehicle Services
                </a>
              </div>

            </div>
          </div>
        </section>

        <section className="tour-intro section-padding">

          <div className="tour-container">

            <div className="tour-section-heading">

              <span>
                TRAVEL WITH US
              </span>

              <h2>
                Explore the Hidden Gems of Tirunelveli
              </h2>

              <p>
                Make Akshaya Residency your base for exploring
                the beautiful Tirunelveli and Tenkasi region.
                We can help arrange comfortable travel to
                temples, waterfalls, heritage locations and
                other attractions.
              </p>

            </div>

            <div className="intro-grid">

              <div className="intro-card">
                <div className="intro-icon">
                  🗺️
                </div>

                <h3>
                  Local Experiences
                </h3>

                <p>
                  Discover destinations beyond the usual
                  tourist routes with local knowledge of the
                  region.
                </p>
              </div>


              <div className="intro-card">
                <div className="intro-icon">
                  🚕
                </div>

                <h3>
                  Comfortable Travel
                </h3>

                <p>
                  Travel comfortably by car while exploring
                  temples, waterfalls, towns and scenic locations.
                </p>
              </div>


              <div className="intro-card">
                <div className="intro-icon">
                  👨‍👩‍👧‍👦
                </div>

                <h3>
                  Flexible Trips
                </h3>

                <p>
                  Suitable for families, couples, pilgrims,
                  groups and travelers looking for customized
                  itineraries.
                </p>
              </div>

            </div>

          </div>

        </section>

        <section
          id="cab-rental"
          className="cab-section section-padding"
        >

          <div className="tour-container">

            <div className="cab-grid">

              <div className="cab-content">

                <span className="tour-small-title">
                  CAB &amp; VEHICLE SERVICES
                </span>

                <h2>
                  Comfortable Vehicles for Your Journey
                </h2>

                <p>
                  Whether you need a local cab, a vehicle for
                  sightseeing or transportation for a multi-day
                  tour, our travel service is designed around
                  your journey.
                </p>

                <div className="vehicle-list">

                  <div>
                    <strong>🚗 Economy Cars</strong>
                    <span>
                      Comfortable options for individuals
                      and small groups.
                    </span>
                  </div>

                  <div>
                    <strong>🚘 Luxury Sedans</strong>
                    <span>
                      A more comfortable travel experience
                      for special journeys.
                    </span>
                  </div>

                  <div>
                    <strong>🚙 Family SUVs</strong>
                    <span>
                      Practical options for families and
                      sightseeing groups.
                    </span>
                  </div>

                  <div>
                    <strong>🚌 Specialty Vehicles</strong>
                    <span>
                      Vehicle options depending on your
                      group and travel requirements.
                    </span>
                  </div>

                </div>

                <p className="cab-note">
                  Rental plans can be arranged for hourly,
                  daily, weekly or monthly requirements.
                </p>

              </div>


              <div className="cab-highlight">

                <div className="cab-highlight-icon">
                  🚕
                </div>

                <h3>
                  Plan Your Journey
                </h3>

                <p>
                  Tell us where you want to go and how many
                  people are travelling. We can help arrange
                  your cab and travel plan.
                </p>

                <a
                  href="tel:+919715172185"
                  className="tour-primary-button"
                >
                  Call +91 9715172185
                </a>

              </div>

            </div>

          </div>

        </section>



        <section
          id="tour-packages"
          className="tour-packages section-padding"
        >

          <div className="tour-container">

            <div className="tour-section-heading center">

              <span>
                POPULAR TOURS
              </span>

              <h2>
                Discover Our Tour Packages
              </h2>

              <p>
                Explore some of the popular pilgrimage and
                sightseeing routes available through Akshaya
                Residency.
              </p>

            </div>


            <div className="tour-cards">

              {tours.map((tour) => (

                <article
                  className="tour-card"
                  key={tour.title}
                >

                  <div className="tour-card-icon">
                    {tour.icon}
                  </div>

                  <div className="tour-card-content">

                    <h3>
                      {tour.title}
                    </h3>

                    <div className="tour-meta">

                      <span>
                        🕐 {tour.duration}
                      </span>

                      <span>
                        💰 {tour.price}
                      </span>

                    </div>

                    <p>
                      {tour.description}
                    </p>

                    <div className="tour-note">
                      {tour.note}
                    </div>

                    <a
                      href="tel:+919715172185"
                      className="tour-card-button"
                    >
                      Enquire About This Tour
                    </a>

                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>



        <section className="places-section section-padding">

          <div className="tour-container">

            <div className="tour-section-heading center">

              <span>
                EXPLORE THE REGION
              </span>

              <h2>
                Places to Visit in Tirunelveli &amp; Tenkasi
              </h2>

              <p>
                Add these destinations to your travel itinerary
                while staying at Akshaya Residency.
              </p>

            </div>


            <div className="places-grid">

              {places.map((place) => (

                <article
                  className="place-card"
                  key={place.title}
                >

                  <div className="place-icon">
                    {place.icon}
                  </div>

                  <h3>
                    {place.title}
                  </h3>

                  <p>
                    {place.description}
                  </p>

                </article>

              ))}

            </div>

          </div>

        </section>



        <section className="why-tour-section section-padding">

          <div className="tour-container">

            <div className="tour-section-heading center">

              <span>
                AKSHAYA RESIDENCY
              </span>

              <h2>
                Why Travelers Choose Us
              </h2>

              <p>
                We combine accommodation with local travel
                assistance to make your visit easier.
              </p>

            </div>


            <div className="features-grid">

              {features.map((feature) => (

                <div
                  className="feature-card"
                  key={feature.title}
                >

                  <div className="feature-number">
                    {feature.icon}
                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.text}
                  </p>

                </div>

              ))}

            </div>


            <div className="sustainability-box">

              <h3>
                Responsible Travel
              </h3>

              <p>
                Akshaya Residency is committed to providing
                enjoyable travel experiences while supporting
                local communities and promoting responsible
                tourism.
              </p>

            </div>

          </div>

        </section>



        <section className="tour-faq section-padding">

          <div className="tour-container">

            <div className="tour-section-heading center">

              <span>
                FAQ
              </span>

              <h2>
                Frequently Asked Questions
              </h2>

            </div>


            <div className="faq-list">

              <details>
                <summary>
                  What tour packages are available?
                </summary>

                <p>
                  We currently highlight Nava Kayilayam,
                  Nava Tirupathi and Tiruchendur tours.
                  Other customized sightseeing trips can
                  also be discussed with us.
                </p>
              </details>


              <details>
                <summary>
                  Can I arrange a cab only?
                </summary>

                <p>
                  Yes. You can contact Akshaya Residency
                  for cab and vehicle requirements without
                  booking a complete tour package.
                </p>
              </details>


              <details>
                <summary>
                  Can you customize a tour?
                </summary>

                <p>
                  Yes. Contact us with your preferred
                  destinations, travel dates and number of
                  passengers so that we can discuss a
                  suitable travel plan.
                </p>
              </details>


              <details>
                <summary>
                  Where can pickup be arranged?
                </summary>

                <p>
                  The tour information in our travel brochure
                  specifically mentions pickup from Tirunelveli
                  or Tenkasi for the Tiruchendur package.
                  Please contact us to confirm pickup options
                  for your trip.
                </p>
              </details>

            </div>

          </div>

        </section>



        <section className="tour-cta">

          <div className="tour-container">

            <div className="tour-cta-box">

              <span>
                READY TO EXPLORE?
              </span>

              <h2>
                Plan Your Next Journey With Akshaya Residency
              </h2>

              <p>
                Stay with us and explore the beautiful
                destinations around Tirunelveli and Tenkasi.
              </p>

              <div className="tour-cta-buttons">

                <Link
                  to="/booking"
                  className="tour-secondary-button"
                >
                  Book Your Stay
                </Link>


                <Link
                  to="/contact"
                  className="tour-secondary-button"
                >
                  Contact Tours & Travels 
                </Link>

              </div>

            </div>

          </div>

        </section>
        <Footer />

      </main>
    </>
  );
}

export default ToursTravels;