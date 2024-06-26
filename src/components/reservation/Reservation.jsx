import axios from "axios";
import * as React from "react";
import Swal from "sweetalert2";
import "react-clock/dist/Clock.css";
import { v4 as uuidv4 } from "uuid";
import Input from "@mui/joy/Input";
import BasicModal from "../BasicModal";
import "react-calendar/dist/Calendar.css";
import { useRestaurants } from "../../store";
import detailsStyle from "./Reservation.module.css";
import "react-datetime-picker/dist/DateTimePicker.css";

function Reservation({ restaurantId }) {
  const { restaurants, setRestaurants, date, time, guests } = useRestaurants(
    (state) => state
  );

  //for modal Closing
  const setModalState = useRestaurants((state) => state.setModalState);
  const url = import.meta.env.VITE_API_URL;

  //popup succes and error
  const showSuccessAlert = () => {
    Swal.fire({
      text: "Reservation confirmed!",
      icon: "success",
    });
  };

  const showErrorAlert = () => {
    Swal.fire({
      icon: "error",
      text: "Sorry, we don't have an empty table at the time you mentioned!",
    });
  };

  //data fetching
  const getData = async () => {
    try {
      const { data } = await axios(url);
      setRestaurants(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  //make Reservation function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      id: uuidv4(),
      clock: time,
      date: date.toDateString(),
      guests,
    };
    setModalState(false);

    const { reservations } = restaurants.find((res) => res.id == restaurantId);
    const isHaveReservation = reservations.some(({ clock, date }) => {
      return clock === obj.clock && date === obj.date;
    });

    if (isHaveReservation) {
      showErrorAlert();
    } else if (+guests > 0) {
      axios
        .patch(url + restaurantId, {
          reservations: [...reservations, obj],
        })
        .then(function (response) {
          if (response.statusText === "OK") {
            showSuccessAlert();
            getData();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <BasicModal
      detailsStyle={detailsStyle}
      handleSubmit={handleSubmit}
      Input={Input}
    />
  );
}

export default Reservation;
