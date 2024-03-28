import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import RoomDialog from "../component/RoomDialog.js";
import dayjs from "dayjs";

export default function MeetingCard({ item, callback }) {
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const initialFormData = {
    name: "",
    description: "",
    capacity: "",
    startDateTime: dayjs(new Date()),
    endDateTime: dayjs(new Date()),
  };

  const [formData, setFormData] = useState(initialFormData);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDateChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  function openDetail(id) {
    fetch("/api/rooms/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          name: data.name,
          description: data.description,
          capacity: data.max_occupancy,
          startDateTime: dayjs(data.start_time),
          endDateTime: dayjs(data.end_time),
        });
        handleClickOpen();
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }

  function doneAction() {
    const values = {
      name: formData.name,
      description: formData.description,
      max_occupancy: formData.capacity,
      start_time: formData.startDateTime,
      end_time: formData.endDateTime,
    };
    fetch("/api/rooms/" + item.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (callback) {
          handleClose();
          callback();
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }
  return (
    <>
      <Card
        onClick={() => {
          openDetail(item.id);
        }}
        sx={{ maxWidth: 300, margin: 1 }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <CardContent height="100">
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Capacity : {item.max_occupancy}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description : {item.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {convertDate(item.start_time)} - {convertDate(item.end_time)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <RoomDialog
        handleClose={handleClose}
        open={open}
        showDelete={item.id}
        doneAction={doneAction}
        handleChange={handleChangeFormData}
        formData={formData}
        handleDateChange={handleDateChange}
        callback={callback}
      />
    </>
  );
}

function convertDate(date) {
  const f_dd = new Date(date);
  const formattedDate = f_dd.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formattedDate;
}
