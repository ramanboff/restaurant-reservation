import axios from "axios";
import "react-clock/dist/Clock.css";
import "react-calendar/dist/Calendar.css";
import { useRestaurants } from "../../store";
import "react-time-picker/dist/TimePicker.css";
import "react-date-picker/dist/DatePicker.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import Reservation from "../reservation/Reservation";
import "react-datetime-picker/dist/DateTimePicker.css";
import detailsStyle from "./RestaurantsDetails.module.css";

function RestaurantsDetails() {
  const url = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  // states
  const { restaurants, setRestaurants } = useRestaurants((state) => state);
  const [currentRestaurant, setCurrentRestaurant] = useState({});

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
      <Link to="/" className={detailsStyle.logo}>
        <h1>RR/</h1>
        <h2>Restaurant Reservation</h2>
      </Link>

      <div className="container">
        <Link className={detailsStyle.backBtn} to={"/"}>
          <IoArrowBackCircle />
        </Link>
        <div className={detailsStyle.detailsContainer}>
          <div className={detailsStyle.fullInfo}>
            <div className={detailsStyle.imageContainer}>
              <img
                src={currentRestaurant?.photo}
                alt={currentRestaurant?.name}
              />
            </div>
            <p className={detailsStyle.description}>
              {currentRestaurant?.description}
            </p>
          </div>

          <Reservation restaurantId={id} />
        </div>
      </div>
    </>
  );
}

export default RestaurantsDetails;
