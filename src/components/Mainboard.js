import React from "react";
import "./Mainboard.css";
import "./Pin.css";
import Pin from "./Pin";

const Mainboard = (props) => {
  const { pins } = props;

  const submitBoard = () => {
    props.getBoards();
  };

  return (
    <div className="app__body">
      <div className="mainboard">
        {pins.map((image) => {
          let { id, description, height, term, urls } = image;
          return (
            <Pin
              onSubmit={submitBoard}
              id={id}
              description={description}
              height={height}
              term={term}
              urls={urls}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Mainboard;
