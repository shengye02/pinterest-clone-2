import React from "react";
import "./Mainboard.css";
import "./Pin.css";
import Pin from "./Pin";

const Mainboard = (props) => {
  const { pins } = props;

  // boards are here actually in the props I think

  const submitBoard = () => {
    props.getBoards();
  };

  return (
    <div className="app__body">
      <div className="mainboard">
        {pins.map((image, index) => {
          let { id, description, height, term, urls } = image;
          return (
            <Pin
              onSubmit={submitBoard}
              key={index}
              id={id}
              description={description}
              height={height}
              term={term}
              urls={urls}
              page="mainBoard"
              // boards={boardsDropdown}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Mainboard;
