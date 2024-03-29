import cardStyle from "./Card.module.css";
function Card({ restaurant }) {
  return (
    <div className={cardStyle.card} key={restaurant.id}>
      <div className={cardStyle.imageContainer}>
        <img src={restaurant.photo} />
      </div>
      <p>{restaurant.name}</p>
    </div>
  );
}

export default Card;
