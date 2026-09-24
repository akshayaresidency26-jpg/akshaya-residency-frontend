import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Rooms from "./Pages/Rooms";
import Explore from "./Pages/Explore";
import ScrollToTop from "./Components/ScrollToTop";
import Booking from "./Pages/Booking"; 
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";

// 
function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/booking" element={<Booking />}/>
        <Route path="/admin/login" element={<AdminLogin />}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

