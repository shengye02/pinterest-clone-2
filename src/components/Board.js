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
          snapshot.docs.map((doc) => console.log(doc.data()))
        );
    }
  }, [board.id]);

  return (
    <div className="board__container" key={board.id}>
      <img
        src={
          boardPins?.[0].image ? boardPins?.[0].urls : "No picture available"
        }
        alt="picture-board"
        className="image"
      />
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

// de user stories opschrijven van deze app want ze hebben ook met elkaar te maken,
// vicieuze circle - want er leiden meer wegen naar ROme plus een goede applicationCache, laat je dingen op verschillende manieren doen maar waarbij je hetzelfde goal BeachAccessOutlined.
