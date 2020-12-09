import React, { useState } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateBoardModal from "./CreateBoardModal";
import db from "../firebase";

function Pin(props) {
  console.log(props, "which propsat Pins am I gietting here?");
  const { image } = props;
  const { urls, height } = image;
  const [clickOpen, setClickOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [board, setBoard] = useState("");

  let description = "";
  if (image.description) {
    description = image.description;
  }

  if (description && description.length > 37) {
    let sentence = description.split(".");
    description = sentence[0] + ".";
  }

  const onClick = () => {
    console.log("clicking pin drow down left");
    setClickOpen((openState) => !openState);
  };

  const createBoardModalOpen = () => {
    console.log("Modal Open To Create Board");
    setModalOpen((openState) => !openState);
  };

  const submitBoard = (e) => {
    e.preventDefault();
    props.onSubmit(board);
    if (board) {
      db.collection("boards").add({
        name: board,
      });
    }
    // function in here where duplicate input is not allowed;
    // previous input will be deleted so that last input (same term) will remain
    // and will be used in App.js to getNewPins at refreshing of the page.
  };

  return (
    <div className="pins">
      {height >= 4000 ? (
        <div className="pin__containerMedium" key={image.id}>
          <img
            src={urls?.regular ? urls.full : "No picture available"}
            className="image"
          />
          <div className="layer">
            <div class="pin__boards__menu">
              <div class="pin__boards__menu left">
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
                {modalOpen ? (
                  <div className="modal__popup">
                    <div className="modal__popup__content">
                      <CreateBoardModal />
                    </div>
                  </div>
                ) : null}
              </div>
              <div class="pin__boards__menu right">
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
        <div className="pin__containerSmall" key={image.id}>
          <img
            src={urls?.regular ? urls.full : "No picture available"}
            className="image"
          />
          <div className="layer">
            <div class="pin__boards__menu">
              <div class="pin__boards__menu left">
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
        <div className="modal">
          <div className="modal__content">
            <div className="modal__content__intro">
              <h1> Create a board</h1>
            </div>
            <div className="modal__content__boardDetails">
              <div className="modal__left">
                <h1> PIN that you pinned</h1>
              </div>
              <div className="modal__right">
                <div className="modal_right__intro">
                  <p> Name</p>
                </div>
                <div className="modal__right__input">
                  <div className="modal__right__inputContainer">
                    <form>
                      <input
                        type="text"
                        value={board}
                        onChange={(e) => setBoard(e.target.value)}
                      />
                      <button onClick={submitBoard} type="submit"></button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Pin;
