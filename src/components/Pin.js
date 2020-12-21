import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "./Modal";
import "./Modal.css";

const Pin = (props) => {
  let { id, description, height, urls, page, boardsToPick } = props;
  const [clickOpen, setClickOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [boardName, setBoard] = useState("");
  const history = useHistory();

  if (description && description.length > 37) {
    let sentence = description.split(".");
    description = sentence[0] + ".";
  }

  const onClick = () => {
    console.log("is onClick getting clicked too?");
    setClickOpen((openState) => !openState);
  };

  const openModal = () => {
    setModalOpen((openState) => !openState);
  };

  const submitBoard = (e) => {
    props.onSubmit(boardName);
  };

  const clickOutside = (e) => {
    setModalOpen(false);
  };

  const searchBoard = (e) => {
    console.log("searching an existing board");
    console.log(e.target.value, " what is in e target alue");
  };

  const pinToBoard = (e) => {
    console.log("pinning to board");
    console.log('testing konnchiwa');
    //pinning current pin to an existing board.
    // look for existing board in firebase;
    // add it to collections of pins with certain information
    // get redirected to BoardPage where you see the new pinned pin immediately
    // history.push(`/boardPage/${boardId}`);
  };

  let sizePin = "small";
  if (height >= 4000) {
    sizePin = "medium";
  } else {
    sizePin = "small";
  }

  let mainBoardPage = false;
  if (page == "mainBoard") {
    mainBoardPage = true;
  }

  return (
    <div className="pin">
      <div className="pin__container" key={id}>
        <div className={`pin__container ${sizePin}`}>
          <img
            src={urls?.regular ? urls.full : urls}
            className="image"
            alt="pin"
          />
          {mainBoardPage && (
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
                              onChange={(e) => console.log(e.target.value)}
                            />
                          </form>
                        </div>
                      </div>
                      <div className="pin__dropdown__boardsToPick">
                        <p>All boards</p>
                        {boardsToPick.map((board) => {
                          return (
                            <div className="boardToPick">
                              <div className="boardToPick__box" key={board.id}>
                                <div className="boardToPick__box__details">
                                  <img
                                    src={board.data?.image}
                                    alt="picture"
                                    className="image"
                                  />
                                  <p> {board.data?.name}</p>
                                  <div className="boardToPick__saveButton">
                                    <p onClick={pinToBoard(board?.id)}> Save</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="pin__dropdown__createBoard">
                        <AddCircleIcon onClick={openModal} />
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
          )}
          <div className="pin__text__container">
            <p>{description}</p>
          </div>
        </div>
      </div>
      {modalOpen ? (
        <Modal
          clickOutside={clickOutside}
          openModal={openModal}
          submitBoard={submitBoard}
          urls={urls?.regular ? urls.full : urls}
          id={id}
          description={description}
          height={height}
        />
      ) : null}
    </div>
  );
};

export default Pin;
