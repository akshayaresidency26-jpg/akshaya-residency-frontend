import { useEffect, useState } from "react";

function RoomCards() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await fetch(
          "https://akshaya-residency-backend.onrender.com/api/rooms"
        );

        if (!response.ok) {
          throw new Error("Failed to load rooms");
        }

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Room loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  const getRoomImage = (image) => {
    if (image === "img-12.jpeg") {
      return require("../Images/img-12.jpeg");
    }

    if (image === "img-11.jpeg") {
      return require("../Images/img-11.jpeg");
    }

    return require("../Images/img-5.jpeg");
  };

  if (loading) {
    return (
      <section className="rooms-section">
        <div className="container">
          <div className="rooms-loading">
            <div className="rooms-loader"></div>
            <p>Preparing your stay...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rooms-section">

      <div className="container">

        {/* Section Heading */}
        <div className="rooms-heading">

          <span className="rooms-subtitle">
            Stay With Comfort
          </span>

          <h1>
            Our <span>Rooms</span>
          </h1>

          <p>
            Relax in thoughtfully designed rooms with modern comforts,
            peaceful surroundings and warm hospitality.
          </p>

          <div className="rooms-heading-line"></div>

        </div>


        {/* Room Cards */}
        <div className="rooms-list">

          {rooms.map((room, index) => (

            <div className="premium-room-card" key={room._id}>

              <div className="room-image-wrapper">

                <span className="room-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <img
                  src={getRoomImage(room.image)}
                  alt={room.name}
                  className="room-image"
                />

                <div className="room-image-overlay"></div>

              </div>


              <div className="room-details">

                <span className="room-label">
                  AKSHAYA RESIDENCY
                </span>

                <h2>{room.name}</h2>

                <div className="room-line"></div>

                <p className="room-description">
                  {room.description}
                </p>


                <div className="room-info">

                  <div className="room-info-item">
                    <span className="room-info-icon">🛏</span>

                    <div>
                      <small>Bedrooms</small>
                      <strong>{room.bedrooms}</strong>
                    </div>
                  </div>


                  <div className="room-price">

                    <small>Starting from</small>

                    <strong>
                      ₹{room.price}
                    </strong>

                    <span>/ night</span>

                  </div>

                </div>


                <div className="room-bottom">

                  <span className="room-stay-text">
                    Comfortable • Peaceful • Convenient
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default RoomCards;