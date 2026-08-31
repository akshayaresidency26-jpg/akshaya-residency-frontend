import banner from "../Images/img-1.jpeg";
import "../Css/Rooms.css";

function RoomsBanner() {
  return (
    <section
      className="rooms-banner"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="rooms-overlay">
        <div className="container">
          {/* <h1>Rooms</h1> */}
        </div>
      </div>
    </section>
  );
}

export default RoomsBanner;