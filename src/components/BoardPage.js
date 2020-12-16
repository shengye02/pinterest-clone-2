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

  console.log(boardId, "what is boardId when rendering");

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

  return (
    <div>
      <BoardHeader name={boardName} />
      <div className="app__body">
        <div className="boardPage">
          {boardPins?.map((boardPin) => {
            let { id, description, height, urls } = boardPin;
            return (
              <Pin
                id={id}
                description={description}
                height={height}
                urls={urls}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
