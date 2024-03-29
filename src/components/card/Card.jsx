import { Link } from "react-router-dom";
import cardStyle from "./Card.module.css";
function Card({ restaurant }) {
  return (
    <div className={cardStyle.card} key={restaurant.id}>
      <div className={cardStyle.imageContainer}>
        <img src={restaurant.photo} />
      </div>
      <div className={cardStyle.bottomContent}>
        <p>{restaurant.name}</p>
        <Link  className={cardStyle.bookingBtn}>click to reservation</Link>
      </div>
    </div>
  );
}

export default Card;
