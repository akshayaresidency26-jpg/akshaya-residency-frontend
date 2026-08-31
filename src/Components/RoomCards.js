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

  if (loading) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <h4>Loading rooms...</h4>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">

        {rooms.map((room) => (
          <div className="room-card mb-5" key={room._id}>

            <div className="row align-items-center">

              <div className="col-lg-4">
                  <img src={room.image === "img-12.jpeg" ? require("../Images/img-12.jpeg") :
                      room.image === "img-11.jpeg" ? require("../Images/img-11.jpeg") :
                      require("../Images/img-5.jpeg")}
                  alt={room.name}
                  className="img-fluid room-image"
                />
              </div>

              <div className="col-lg-8">

                <h2>{room.name}</h2>

                <p>{room.description}</p>

                <p>
                  <strong>₹{room.price}</strong> / night
                </p>

                <p>
                  Bedrooms: {room.bedrooms}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}

export default RoomCards;