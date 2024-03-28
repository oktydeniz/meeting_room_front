import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export default function AlertDialog({
  handleClose,
  open,
  doneAction,
  formData,
  handleChange,
  handleDateChange,
  showDelete,
  callback,
}) {
  let navigate = useNavigate();
  function deleteItem() {
    fetch(`/api/rooms/${showDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return true;
      })
      .then(() => {
        if (callback) {
          callback();
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="capacity"
            label="Capacity"
            type="number"
            fullWidth
            variant="standard"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start Date & Time"
              fullWidth
              value={formData.startDateTime}
              onChange={(newValue) =>
                handleDateChange("startDateTime", newValue)
              }
              renderInput={(params) => <TextField {...params} />}
            />
            <Box m={2}></Box>
            <DateTimePicker
              label="End Date & Time"
              fullWidth
              value={formData.endDateTime}
              onChange={(newValue) => handleDateChange("endDateTime", newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {showDelete ? (
            <Button color="error" onClick={deleteItem}>
              Delete
            </Button>
          ) : (
            <></>
          )}
          <Button onClick={doneAction} autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
