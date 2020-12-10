import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./Board.css";

function Board(props) {
  const { board } = props;
  const [pins, setPinsBoard] = useState();

  useEffect(() => {
    db.collection("boards")
      .doc(board.id)
      .collection("pins")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => setPinsBoard(doc.data()));
      });
  }, [board]);

  console.log(pins, "what is in pins now?");
  return (
    <div className="board__container" key={board.id}>
      <img
        src="https://www.nme.com/wp-content/uploads/2020/04/rick-and-morty-season-4.jpg"
        alt="RickAndMorty"
        className="image"
      />
      <div className="board__container__info">
        <h1> {board.data?.name}</h1>
        <p> {pins?.length > 0 ? pins.length + "pins" : "0 pins"}</p>
      </div>
      {/* // whenever you click on Board, then you can see all the pins there
      accumulated of that board. // different component though - like BoardPage. */}
    </div>
  );
}

export default Board;

// de user stories opschrijven van deze app want ze hebben ook met elkaar te maken,
// vicieuze circle - want er leiden meer wegen naar ROme plus een goede applicationCache, laat je dingen op verschillende manieren doen maar waarbij je hetzelfde goal BeachAccessOutlined.
