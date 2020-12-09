import React from "react";
import "./Mainboard.css";
import "./Pin.css";
import Pin from "./Pin";

const Mainboard = (props) => {
  const { pins } = props;

  const submitBoard = () => {
    console.log("at mainboard now");
    props.getBoards();
  };
  return (
    <div className="app__body">
      <div className="mainboard">
        {pins.map((image) => {
          return <Pin onSubmit={submitBoard} key={image.id} image={image} />;
        })}
      </div>
    </div>
  );
};

export default Mainboard;
