import React, { useEffect, useState } from "react";
import "./BoardPage.css";
import { useParams } from "react-router-dom";
import Pin from "./Pin";
import db from "../firebase";
import BoardHeader from "./BoardHeader";

const BoardPage = () => {
  const { boardId } = useParams();
  const [boardPins, setBoardPins] = useState();
  const [boardName, setBoardName] = useState();

  useEffect(() => {
    if (boardId) {
      db.collection("boards")
        .doc(boardId)
        .onSnapshot((snapshot) => setBoardName(snapshot.data().name));

      db.collection("boards")
        .doc(boardId)
        .collection("pins")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setBoardPins(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [boardId]);

  console.log(boardPins, "what is in boardPins BoardPage");
  return (
    <div>
      <BoardHeader name={boardName} />
      <div className="app__body">
        <div className="boardPage">
          {boardPins?.map((image) => {
            return <Pin key={image.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
