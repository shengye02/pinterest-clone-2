import React from "react";
import "./UserBoards.css";
import "./Pin.css";
import Pin from "./Pin";

function UserBoards(props) {
  console.log(props, "what is in props at UserBOrads");
  console.log("hello you are at the UserBoards");
  return (
    <div>
      <div className="userboards__header">
        <div className="userboards__header__container">
          <h1>HELLO</h1>
          <h1>HELLO</h1>
          <h1>HELLO</h1>
          <h1>HELLO</h1>
        </div>
      </div>
      <div className="userboards__header__tools">
        <div className="userboards__header__tools left">
          <h1>Icon</h1>
          <h1>Icon</h1>
        </div>
        <div className="userboards__header__tools right">
          <h1>Icon</h1>
          <h1>Icon</h1>
        </div>
      </div>
      <div className="userboards"></div>
    </div>
  );
}

export default UserBoards;
