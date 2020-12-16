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
import { Link } from "react-router-dom";

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
  };

  return (
    <div className="app__header">
      <div className="header__wrapper">
        <div className="header__logo">
          <Link to="/mainBoard">
            <IconButton>
              <PinterestIcon />
            </IconButton>
          </Link>
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
          <Link to="/userBoard">
            <IconButton>
              <FaceIcon />
            </IconButton>
          </Link>
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
