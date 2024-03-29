import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import RestaurantsStyle from "./Restaurants.module.css"

function Restaurants() {
  // states
  const [restaurants, setRestaurants] = useState(null);
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
  return (
    <>
      <input
        className={RestaurantsStyle.searchInput}
        type="text"
        placeholder="search restaurant"
      />
      <div className={RestaurantsStyle.cardsWrapper}>
        {restaurants &&
          restaurants.map((restaurant) => (
            <Card key={restaurant.id} restaurant={restaurant} />
          ))}
      </div>
    </>
  );
}

export default Restaurants;
