import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import RestaurantsStyle from "./Restaurants.module.css";

function Restaurants() {
  // states
  const [restaurants, setRestaurants] = useState(null);
  const [searchRestaurant, setSearchRestaurant] = useState("");
  //data fetching
  useEffect(() => {
    fetch("http://localhost:8000/restaurants")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRestaurants(data);
      });
  }, []);

  //search restaurant by name start
  const handleSearchRestaurant = (e) => {
    setSearchRestaurant(e.target.value.trim());
  };

  const filteredRestaurants = restaurants
    ? restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchRestaurant.toLowerCase())
      )
    : "";
  //search restaurant by name end
  return (
    <>
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
    </>
  );
}

export default Restaurants;
