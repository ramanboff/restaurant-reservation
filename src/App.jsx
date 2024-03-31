import "./App.css";
import Restaurants from "./pages/home/Restaurants";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantsDetails from "./components/RestaurantsDetails/RestaurantsDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<RestaurantsDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
