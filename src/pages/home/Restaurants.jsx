import axios from "axios";
import { useRestaurants } from "../../store";
import Card from "../../components/card/Card";
import React, { useEffect, useState } from "react";
import RestaurantsStyle from "./Restaurants.module.css";

function Restaurants() {
  // states
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const { restaurants, setRestaurants } = useRestaurants((state) => state);
  const url = import.meta.env.VITE_API_URL;

  //data fetching
  const getData = async () => {
    try {
      const { data } = await axios(url);
      setRestaurants(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //search restaurant by name start
  const handleSearchRestaurant = (e) => {
    setSearchRestaurant(e.target.value.trim());
  };

  const filteredRestaurants =
    restaurants &&
    restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchRestaurant.toLowerCase())
    );
  //search restaurant by name end
  return (
    <div className={`${RestaurantsStyle.detailsContainer} container`}>
      <h2>Restaurant Reservation</h2>
      <input
        onChange={handleSearchRestaurant}
        className={RestaurantsStyle.searchInput}
        type="text"
        placeholder="search restaurant"
      />
      <div className={RestaurantsStyle.cardsWrapper}>
        {restaurants &&
          filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} restaurant={restaurant} />
          ))}
      </div>
    </div>
  );
}

export default Restaurants;
