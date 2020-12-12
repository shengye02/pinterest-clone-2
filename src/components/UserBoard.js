import React from "react";
import "./UserBoard.css";
import Board from "./Board";
import UserProfileHeader from "./UserProfileHeader";

function UserBoard(props) {
  let { boards } = props;
  console.log(boards, "how many boards?");
  return (
    <div>
      <UserProfileHeader />
      <div className="app__body">
        <div className="userboard">
          {boards.map((board) => {
            return <Board board={board} key={board.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default UserBoard;
