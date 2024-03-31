import * as React from "react";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import { useRestaurants } from "../store";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import ModalClose from "@mui/joy/ModalClose";

export default function BasicModal({ detailsStyle, handleSubmit, Input }) {
  const { modalState, setModalState, setGuests, setTime, time, date, setDate } =
    useRestaurants((state) => state);

  return (
    <React.Fragment>
      <Button
        className={detailsStyle.makeReservationBtn}
        color="primary"
        onClick={() => setModalState(true)}
      >
        make a reservation
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalState}
        onClose={() => setModalState(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          {modalState && (
            <form className={detailsStyle.form} onSubmit={handleSubmit}>
              <div>
                <TimePicker
                  className={detailsStyle.timePicker}
                  onChange={setTime}
                  value={time}
                />
              </div>
              <div>
                <DatePicker
                  className={detailsStyle.datePicker}
                  onChange={setDate}
                  value={date}
                />
              </div>

              <Input
                type="number"
                className={detailsStyle.personCount}
                color="red"
                defaultValue={0}
                onChange={(e) => setGuests(e.target.value)}
                slotProps={{
                  input: {
                    min: 1,
                    max: 12,
                    step: 1,
                  },
                }}
              />
              <Button type="submit">confirm reservation</Button>
            </form>
          )}
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
