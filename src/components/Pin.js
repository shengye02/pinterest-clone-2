import React, { useState, useRef } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "./Modal";
import "./Modal.css";

const Pin = (props) => {
  let { id, description, height, urls, page } = props;
  const [clickOpen, setClickOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [boardName, setBoard] = useState("");

  if (description && description.length > 37) {
    let sentence = description.split(".");
    description = sentence[0] + ".";
  }

  const onClick = () => {
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
                            {/* <button onClick="hello" type="submit"></button> */}
                            {/* <div className="dropdown__existing__boards">
                              <h1> Hello existing bords</h1>
                              render through each board to make a small component 
                              just like rooms in the whatsapp sidebarChat
                            </div> */}
                          </form>
                        </div>
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
