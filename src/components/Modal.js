import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";

const Modal = (props) => {
  let { id, description, height, urls } = props;
  const [boardName, setBoard] = useState("");
  const [boardSubmitted, setNewBoard] = useState(false);
  const [warning, setWarning] = useState(false);
  const [boardId, setBoardId] = useState("");
  const myRef = useRef();

  if (description && description.length > 37) {
    let sentence = description.split(".");
    description = sentence[0] + ".";
  }

  const openModal = () => {
    props.openModal();
  };

  const addBoard = (boardName) => {
    if (boardName) {
      db.collection("boards")
        .add({
          name: boardName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function (docRef) {
          db.collection("boards")
            .doc(docRef.id)
            .collection("pins")
            .add({
              id: id,
              urls: urls?.regular ? urls.full : urls,
              height: height,
              description: description,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          setBoardId(docRef.id);
          setNewBoard(boardName);
        });
    }
  };

  const isValid = (boardName) => {
    if (boardName == " " || boardName == "") {
      return false;
    }

    let double = [];
    db.collection("boards")
      .where("name", "==", boardName)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          double.push({ id: doc.id, data: doc.data() });
        });
      })
      .then(() => {
        if (double[0]) {
          setWarning(boardName);
        } else {
          addBoard(boardName);
        }
      });
  };

  const submitBoard = (e) => {
    e.preventDefault();
    isValid(boardName);
    props.submitBoard(boardName);
  };

  const clickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      props.clickOutside(false);
    }
  };

  return (
    <div className="modal" onClick={clickOutside}>
      <div className="modal__content" ref={myRef}>
        <div className="modal__content__intro">
          <h1> Create a board</h1>
        </div>
        <div className="modal__content__boardDetails">
          <div className="modal__left">
            <img
              src={urls?.regular ? urls.full : urls}
              alt="modal"
              className="image"
            />
          </div>
          <div className="modal__right">
            <div className="modal_right__intro">
              <p> Name</p>
            </div>
            <form>
              <input
                type="text"
                value={boardName}
                onChange={(e) => setBoard(e.target.value)}
              />
              <button onClick={submitBoard} type="submit"></button>
            </form>
          </div>
        </div>
        {boardSubmitted && (
          <div className="alert__boardsubmitted">
            <div className="alert__boardsubmitted__container__succes">
              <h1> Alright! You created a new board named: {boardName} </h1>
              <Link to={`/boardPage/${boardId}`}> Go to board here </Link>
            </div>
          </div>
        )}
        {warning && (
          <div className="alert__boardsubmitted">
            <div className="alert__boardsubmitted__container__warning">
              <h1>
                Either your board name is empty or this board already exists:{" "}
                {boardName}
              </h1>
            </div>
          </div>
        )}
        <div className="modal__content__buttons">
          <button onClick={openModal}>Cancel</button>
          <button onClick={submitBoard} type="submit">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
