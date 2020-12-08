import React from "react";
import "./Mainboard.css";
import "./Pin.css";
import Pin from "./Pin";

const Mainboard = (props) => {
  const { pins } = props;

  return (
    <div className="mainboard">
      <h1> HELLO MAINBOARD</h1>
      {/* {pins.map((image) => {
        return <Pin key={image.id} image={image} />;
      })} */}
    </div>
  );
};

export default Mainboard;
