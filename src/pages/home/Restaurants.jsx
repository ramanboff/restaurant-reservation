import React from "react";

function Restaurants() {
  return (
    <>
      <input
        className={Restaurants.searchInput}
        onChange={handleSearchRestaurant}
        type="text"
        placeholder="search restaurant"
      />
    </>
  );
}

export default Restaurants;
