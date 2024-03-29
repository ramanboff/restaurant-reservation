import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Restaurants from "./pages/home/Restaurants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Restaurants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
