import React from "react";
import "./Mainboard.css";
import "./Pin.css";
import Pin from "./Pin";

function Mainboard(props) {
  const { pins } = props;

  return (
    <div className="mainboard">
      {pins.map((image) => {
        return <Pin key={image.id} image={image} />;
      })}
    </div>
  );
}

export default Mainboard;
