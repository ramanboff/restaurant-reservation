import axios from "axios";
import "react-clock/dist/Clock.css";
import Reservation from "../reservation/Reservation";
import "react-calendar/dist/Calendar.css";
import { useRestaurants } from "../../store";
import "react-time-picker/dist/TimePicker.css";
import "react-date-picker/dist/DatePicker.css";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import "react-datetime-picker/dist/DateTimePicker.css";
import detailsStyle from "./RestaurantsDetails.module.css";

function RestaurantsDetails() {
  const { id } = useParams();
  const restaurants = useRestaurants((state) => state.allRestaurants);
  const setRestaurants = useRestaurants((state) => state.updateRestaurants);
  const [currentRestaurant, setCurrentRestaurant] = useState({});
  const url = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    const res = restaurants.find((res) => res.id == id);
    setCurrentRestaurant(() => res);
  }, [restaurants]);

  return (
    <>
      <Link to={"/"}>
        <IoArrowBackCircle className={detailsStyle.backBtn} />
      </Link>
      <div className={`${detailsStyle.detailsContainer} container`}>
        <div className={detailsStyle.fullInfo}>
          <div className={detailsStyle.imageContainer}>
            <img src={currentRestaurant?.photo} alt={currentRestaurant?.name} />
          </div>
          <p className={detailsStyle.description}>
            {currentRestaurant?.description}
          </p>
        </div>

        <Reservation restaurantId={id} />
      </div>
    </>
  );
}

export default RestaurantsDetails;
