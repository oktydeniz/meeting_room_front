import React, { useEffect, useState } from "react";
import Layout from "../Layout.js";
import "../static/style/home.css";
import FullWidthTextField from "../component/FullWidthTextField.js";
import MeetingCard from "../component/MeetingCard.js";
import FloatingActionButton from "../component/FloatingActionButton.js";
import RoomDialog from "../component/RoomDialog.js";
import { Divider } from "@mui/material";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

function MeetingsHome() {
  let navigate = useNavigate();
  var [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
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

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const initialFormData = {
    name: "",
    description: "",
    capacity: "",
    startDateTime: dayjs(new Date()),
    endDateTime: dayjs(new Date()),
  };

  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/rooms", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      setIsLoaded(true);
      setList(data);
    } catch (e) {
      setError(e);
      setIsLoaded(true);
      console.error("There was a problem with the fetch operation:", e);
    }
  };

  function doneAction() {
    handleClose();
    saveFormData(formData);
    fetchData();
    setFormData(initialFormData);
  }

  function saveFormData(data) {
    const values = {
      name: data.name,
      description: data.description,
      max_occupancy: data.capacity,
      start_time: data.startDateTime,
      end_time: data.endDateTime,
    };
    fetch("/api/rooms", {
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
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function searchResult(e) {
    console.log(e);
  }

  function handleClickClip() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    navigate("/login", { replace: true });
  }

  return (
    <Layout>
      <div style={{ position: "absolute", top: 0, right: 0, margin: "10px" }}>
        <Chip label="Log out" variant="outlined" onClick={handleClickClip} />
      </div>
      <div className="container">
        <h1>Welcome</h1>
        <FullWidthTextField onChange={searchResult} />
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
              <p>You Don't have Meeting Rooms</p>
            )}
          </div>
        </div>
        <FloatingActionButton handleAction={handleClickOpen} />
        <RoomDialog
          handleClose={handleClose}
          open={open}
          doneAction={doneAction}
          handleChange={handleChangeFormData}
          formData={formData}
          handleDateChange={handleDateChange}
        />
      </div>
    </Layout>
  );
}

export default MeetingsHome;
