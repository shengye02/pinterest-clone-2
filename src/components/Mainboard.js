import React from "react";
import "./Mainboard.css";
import "./Pin.css";
import Pin from "./Pin";
import AddIcon from '@material-ui/icons/Add';

const Mainboard = ({ interests, pins, getBoards, boardsToPick }) => {
  console.log(interests)

  return (
    <div className="app__body">
      <div className="mainboard">
        <div className="interests-container">
          <div className="interests">
            <h2>Ideas in your feed are based on these topics</h2>
            <div className="interest-items-container">
              {
                interests.map(interest => (
                  <div className="interest-card" style={{ background: `url('${interest.img}')` }}>
                    <div className="placeholder"></div>
                    <p>{interest.name}</p>
                  </div>
                ))
              }
              <div className="interest-selector-button interest-card">
                <div className="plus-icon-container">
                    <AddIcon />
                </div>
              </div>
            </div>
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
