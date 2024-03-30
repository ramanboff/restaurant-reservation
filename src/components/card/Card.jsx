import { Link } from "react-router-dom";
import cardStyle from "./Card.module.css";

import * as React from "react";
// import Button from '@mui/joy/Button';

import Button from "@mui/joy/Button";

function Card({ restaurant }) {
  return (
    <div className={cardStyle.card} key={restaurant.id}>
      <div className={cardStyle.imageContainer}>
        <img src={restaurant.photo} />
      </div>
      <div className={cardStyle.bottomContent}>
        <p>{restaurant.name}</p>
        <Link
          to={`/restaurants/${restaurant.id}`}
          className={cardStyle.bookingBtn}
        >
          <Button type="submit" size="sm">show more</Button>
          
        </Link>
      </div>
    </div>
  );
}

export default Card;
