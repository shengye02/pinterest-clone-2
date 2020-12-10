import React from "react";
import "./UserBoards.css";
import "./Pin.css";
import Pin from "./Pin";
import Board from "./Board";

function UserBoards(props) {
  let { boards } = props;
  return (
    <div className="app__body">
      <div className="userboard">
        {boards.map((board) => {
          return <Board board={board} />;
        })}
      </div>
    </div>
  );
}

export default UserBoards;
