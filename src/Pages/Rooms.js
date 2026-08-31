import Navbar from "../Components/Navbar";
// import RoomsBanner from "../Components/RoomsBanner";
import RoomCards from "../Components/RoomCards";
import Footer from "../Components/Footer";
import ResidencyImages from "../Components/ResidencyImages";

function Rooms() {
  return (
    <>
      <Navbar />
      {/* <RoomsBanner /> */}
      <RoomCards />
      <ResidencyImages />
      <Footer />
    </>
  );
}

export default Rooms;