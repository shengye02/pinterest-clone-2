import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./Board.css";
import { Link } from "react-router-dom";

const Board = (props) => {
  const { board } = props;
  const [boardPins, setPinsBoard] = useState();

  useEffect(() => {
    if (board.id) {
      db.collection("boards")
        .doc(board.id)
        .collection("pins")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setPinsBoard(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [board.id]);

  return (
    <div className="board__container" key={board.id}>
      <img src={boardPins?.[0].urls} alt="picture-board" className="image" />
      <Link to={`/boardPage/${board.id}`}>
        <div className="board__container__info">
          <h1> {board.data?.name}</h1>
          <p>{boardPins?.length > 0 ? boardPins.length + " pins" : "0 pins"}</p>
        </div>
      </Link>
    </div>
  );
};

export default Board;
