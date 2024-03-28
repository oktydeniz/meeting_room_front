import React, { useEffect, useState } from "react";
import Layout from "./Layout.js";
import Chip from "@mui/material/Chip";
import "../src/static/style/home.css";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { Card, Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import MeetingCard from "./component/MeetingCard.js";
dayjs.extend(utc);
dayjs.extend(timezone);
function UserLayout() {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  function handleClickClip() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    navigate("/login", { replace: true });
  }
  const initialFormData = {
    capacity: "",
    startDateTime: dayjs.tz(new Date(), "Europe/Istanbul"),
    endDateTime: dayjs.tz(new Date(), "Europe/Istanbul"),
  };
  const handleClose = () => {};
  const [formData, setFormData] = useState(initialFormData);
  const [list, setList] = useState([]);
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

  function doneAction() {
    setList([]);
    const values = {
      max_occupancy: formData.capacity,
      start_time: dayjs.tz(formData.startDateTime, "Europe/Istanbul"),
      end_time: dayjs.tz(formData.endDateTime, "Europe/Istanbul"),
    };
    const queryString = new URLSearchParams(values).toString();
    fetch(`/api/availablerooms?${queryString}`, {
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
        console.log(data);
        setList(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }
  return (
    <Box>
      <div style={{ position: "absolute", top: 0, right: 0, margin: "10px" }}>
        <Chip label="Log out" variant="outlined" onClick={handleClickClip} />
      </div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="100vh"
        sx={{
          "& .container": {
            width: "100%",
            maxWidth: "600px",
            margin: "auto",
            padding: "20px",
            boxSizing: "border-box",
          },
        }}
      >
        <div className="container">
          <h1>Welcome</h1>
          <Divider flexItem />
          <h3>Find Best Rooms For Your Group</h3>
          <Card
            sx={{
              width: "100%",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              borderRadius: "16px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              margin="dense"
              id="capacity"
              label="Capacity"
              type="number"
              fullWidth
              variant="standard"
              name="capacity"
              value={formData.capacity}
              onChange={handleChangeFormData}
            />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date & Time"
                fullWidth
                timezone="Europe/Istanbul"
                value={formData.startDateTime}
                onChange={(newValue) =>
                  handleDateChange("startDateTime", newValue)
                }
                renderInput={(params) => <TextField {...params} />}
              />
              <Box m={2} />
              <DateTimePicker
                label="End Date & Time"
                fullWidth
                value={formData.endDateTime}
                onChange={(newValue) =>
                  handleDateChange("endDateTime", newValue)
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button
              onClick={doneAction}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Search
            </Button>
          </Card>
        </div>

        <div className="meetings-container">
          <div className="meetings">
            {list.length > 0 ? (
              <div>
                <p>Meeting Rooms</p>
                <Divider />
                <div className="meeting-lists">
                  {list.map((item, index) => (
                    <MeetingCard
                      callback={handleClose}
                      key={item.id}
                      item={item}
                    ></MeetingCard>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Box>
      
    </Box>
  );
}

export default UserLayout;
