import React, { useState } from "react";
import PinterestIcon from "@material-ui/icons/Pinterest";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FaceIcon from "@material-ui/icons/Face";
import TextsmsIcon from "@material-ui/icons/Textsms";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { IconButton } from "@material-ui/core";
import "./Header.css";
import db from "../firebase";

function Header(props) {
  const [clickOpen, setClickOpen] = useState(false);
  const [input, setInput] = useState("");

  const onClick = () => {
    setClickOpen((openState) => !openState);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(input);
    if (input) {
      db.collection("terms").add({
        term: input,
      });
    }
    // function in here where duplicate input is not allowed;
    // previous input will be deleted so that last input (same term) will remain
    // and will be used in App.js to getNewPins at refreshing of the page.
  };

  return (
    <div className="app__header">
      <div className="header__wrapper">
        <div className="header__logo">
          <IconButton>
            <PinterestIcon />
          </IconButton>
        </div>
        <div className="header__button homePage">
          <a href="/">Homepage</a>
        </div>
        <div className="header__button following">
          <a href="/">Following</a>
        </div>
        <div className="header__search">
          <div className="header__searchContainer">
            <SearchIcon />
            <form>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button onClick={onSearchSubmit} type="submit">
                Send a message
              </button>
            </form>
          </div>
        </div>
        <div className="header__menuItems">
          <div className="header__notification" onClick={onClick}>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            {clickOpen ? (
              <div className="header__notification__dropdown">
                <div className="header__notification__dropdown updates">
                  <h1>Updates</h1>
                </div>
              </div>
            ) : null}
          </div>
          <div className="header__messages" onClick={onClick}>
            <IconButton>
              <TextsmsIcon />
            </IconButton>
            {clickOpen ? (
              <div className="header__messages__sidenav">
                <div className="header__message__intro">
                  <h1> Messages</h1>
                </div>
              </div>
            ) : null}
          </div>
          <IconButton>
            {/* // will contain link to profile page */}
            <FaceIcon />
          </IconButton>
          <div className="header__options" onClick={onClick}>
            <IconButton size="small">
              <KeyboardArrowDownIcon />
            </IconButton>
            {clickOpen ? (
              <div className="header__options__dropdown">
                <div className="header__options__intro">
                  <h1> Options</h1>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
