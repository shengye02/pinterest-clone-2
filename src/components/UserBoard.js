import React from "react";
import "./UserBoard.css";
import Board from "./Board";
import UserBoardHeader from "./UserBoardHeader";

function UserBoard(props) {
  let { boards } = props;

  return (
    <div>
      <UserBoardHeader />

      <div className="app__body">
        <div className="userboard">

          {
            boards.map((board) => {
              return <Board board={board} key={board.id} />;
            })
          }

        </div>

      </div>
    </div>
  );
}

export default UserBoard;
