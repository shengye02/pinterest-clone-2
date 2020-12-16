import React, { useState, useRef } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";

function Pin(props) {
  let { id, description, height, urls } = props;
  const [clickOpen, setClickOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [boardName, setBoard] = useState("");
  const [boardSubmitted, setNewBoard] = useState(false);
  const [warning, setWarning] = useState(false);
  const [boardId, setBoardId] = useState("");
  const myRef = useRef();

  if (description && description.length > 37) {
    let sentence = description.split(".");
    description = sentence[0] + ".";
  }

  const onClick = () => {
    setClickOpen((openState) => !openState);
  };

  const createBoardModalOpen = (id) => {
    setModalOpen((openState) => !openState);
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
            });
          console.log(docRef.id, "what is the docRef.id");
          setBoardId(docRef.id);
          setNewBoard(boardName);
        });
    }
  };

  const isValid = (boardName) => {
    if (boardName == " " || boardName == "") {
      console.log(boardName, "what is in boardName?");
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
    props.onSubmit(boardName);
    // setStatusNewBoard((showState) => !showState);
  };

  const clickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  };

  return (
    <div className="pin">
      {height >= 4000 ? (
        <div className="pin__containerMedium" key={id}>
          <img
            src={urls?.regular ? urls.full : urls}
            className="image"
            alt="medium"
          />
          <div className="layer">
            <div className="pin__boards__menu">
              <div className="pin__boards__menu left">
                <div className="pin__boards__menuDetails">
                  <h1>Boards</h1>
                  <KeyboardArrowDownIcon onClick={onClick} />
                </div>
                {clickOpen ? (
                  <div className="pin__dropdown">
                    <div className="pin__dropdown__search">
                      <div className="pin__dropdown__searchContainer">
                        <SearchIcon />
                        <form>
                          <input
                            placeholder="Search"
                            type="text"
                            onChange={(e) => console.log(e)}
                          />
                        </form>
                      </div>
                    </div>
                    <div className="pin__dropdown__createBoard">
                      <AddCircleIcon onClick={createBoardModalOpen} />
                      <p> Create board</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="pin__boards__menu right">
                <div className="pin__boards__menuDetails">
                  <h1>Save</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="pin__text__container">
            <p>{description}</p>
          </div>
        </div>
      ) : (
        <div className="pin__containerSmall" key={id}>
          <img
            src={urls?.regular ? urls.full : "No picture available"}
            className="image"
            alt="small"
          />
          <div className="layer">
            <div className="pin__boards__menu">
              <div className="pin__boards__menu left">
                <div className="pin__boards__menuDetails">
                  <h1>Boards</h1>
                  <KeyboardArrowDownIcon onClick={onClick} />
                </div>
                {clickOpen ? (
                  <div className="pin__dropdown">
                    <div className="pin__dropdown__search">
                      <div className="pin__dropdown__searchContainer">
                        <SearchIcon />
                        <form>
                          <input
                            placeholder="Search"
                            type="text"
                            onChange={(e) => console.log(e)}
                          />
                          {/* <button onClick={} type="submit">
                        </button> */}
                        </form>
                      </div>
                    </div>
                    <div className="pin__dropdown__createBoard">
                      <AddCircleIcon onClick={createBoardModalOpen} />
                      <p> Create board</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="pin__boards__menu right">
                <div className="pin__boards__menuDetails">
                  <h1>Save</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="pin__text__container">
            <p>{description}</p>
          </div>
        </div>
      )}
      {modalOpen ? (
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
                    Either your board name is empty or this board already
                    exists: {boardName}
                  </h1>
                </div>
              </div>
            )}
            <div className="modal__content__buttons">
              <button onClick={createBoardModalOpen}>Cancel</button>
              <button onClick={submitBoard} type="submit">
                Create
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Pin;
