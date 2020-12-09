import React from "react";
import "./UserBoards.css";
import "./Pin.css";
import Pin from "./Pin";

function UserBoards(props) {
  let { boards } = props;

  const createBoard = (board) => {
    console.log(board, "hello new board!");
  };
  return (
    <div className="app__body">
      <div className="userboards">
        <h1>One Board here!</h1>
        {boards.map((board) => {
          console.log(board, "what is board here in UserBoards");
          //   return <Board key={image.id} boardedPins={boardedPins} />;
        })}
      </div>
    </div>
  );
}

export default UserBoards;
