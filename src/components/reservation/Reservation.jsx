import axios from "axios";
import Swal from "sweetalert2";
import "react-clock/dist/Clock.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useRestaurants } from "../../store";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import detailsStyle from "./Reservation.module.css"

import * as React from "react";


import Button from "@mui/joy/Button";

function Reservation({ restaurantId }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(0);
  const restaurants = useRestaurants((state) => state.allRestaurants);
  // const {allRestaurants,updateRestaurants} = useRestaurants((state) => state)
  const setRestaurants = useRestaurants((state) => state.updateRestaurants);
  const url = import.meta.env.VITE_API_URL;

  const showSuccessAlert = () => {
    Swal.fire({
      text: "Rezervasiya tamamlandı!",
      icon: "success",
    });
  };

  const showErrorAlert = () => {
    Swal.fire({
      icon: "error",
      text: "Qeyd etdiyiniz vaxt artıq rezervasiya edilib!",
    });
  };

  const getData = async () => {
    try {
      const { data } = await axios(url);
      setRestaurants(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      id: uuidv4(),
      clock: time,
      date: date.toDateString(),
      guests,
    };

    const { reservations } = restaurants.find((res) => res.id == restaurantId);

    const isHaveReservation = reservations.some(({ clock, date }) => {
      return clock === obj.clock && date === obj.date;
    });

    if (isHaveReservation) {
      showErrorAlert();
    } else {
      if (guests < 1) {
        alert("qonaq sayi 1den az ola bilmeez");
      } else {
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
    }
  };

  return (
    <div className={detailsStyle.formWrapper}>
      <form className={detailsStyle.form} onSubmit={handleSubmit}>
        <div>
          <TimePicker className={detailsStyle.timePicker} onChange={setTime} value={time} />
        </div>
        <div>
          <DatePicker
            className={detailsStyle.datePicker}
            onChange={setDate}
            value={date}
          />
        </div>

        <input
          className={detailsStyle.guest}
          min={1}
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <Button type="submit">make a reservation</Button>
      </form>
    </div>
  );
}

export default Reservation;
