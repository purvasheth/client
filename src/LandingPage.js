import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MainLogic from "./MainLogic";
import "./App.css";

const LandingPage = () => {
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [roomError, setRoomError] = React.useState(false);

  return (
    <React.Fragment>
      {id === "" ? (
        <div className="center">
          <h1>Join a room to play Bingo with friends</h1>
          <TextField
            error={nameError}
            helperText={nameError ? "Required" : false}
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <TextField
            error={roomError}
            label="Room Name"
            value={room}
            helperText={roomError ? "Required" : false}
            onChange={(e) => setRoom(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            onClick={() => {
              if (name === "") {
                setNameError(true);
              } else if (room === "") {
                setRoomError(true);
              } else {
                setId(name);
              }
            }}
            color="primary"
          >
            Submit
          </Button>
        </div>
      ) : (
        <MainLogic name={id} room={room} />
      )}
    </React.Fragment>
  );
};

export default LandingPage;
