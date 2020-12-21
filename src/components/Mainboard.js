import React from "react";
import "./Mainboard.css";
import "./Pin.css";
import Pin from "./Pin";

const Mainboard = ({ interests, pins, getBoards, boardsToPick }) => {
  console.log(interests)

  return (
    <div className="app__body">
      <div className="mainboard">

        <div className="interests">
          <h2>Ideas in your feed are based on these topics</h2>
          <div className="interests-container">
            {
              interests.map(interest => (
                <img src={interest.img} alt={interest.name} />
              ))
            }
          </div>
        </div>

        {pins.map((image, index) => {
          let { id, description, height, term, urls } = image;
          return (
            <Pin
              onSubmit={getBoards}
              key={index}
              id={id}
              description={description}
              height={height}
              term={term}
              urls={urls}
              page="mainBoard"
              boardsToPick={boardsToPick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Mainboard;
