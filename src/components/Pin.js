import React, { useState, useRef } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";
import Modal from "./Modal";

const Pin = (props) => {
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

  const openModal = () => {
    setModalOpen((openState) => !openState);
  };

  const submitBoard = (e) => {
    props.onSubmit(boardName);
  };

  const clickOutside = (e) => {
    setModalOpen(false);
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
                        {/* //Search for existings boards */}
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
          <div className="pin__text__container">
            <p>{description}</p>
          </div>
        </div>
      )}
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
