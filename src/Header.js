import React, { useState } from "react";
import PinterestIcon from "@material-ui/icons/Pinterest";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FaceIcon from "@material-ui/icons/Face";
import TextsmsIcon from "@material-ui/icons/Textsms";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { IconButton } from "@material-ui/core";
import "./Header.css";

function Header() {
  const [clickOpenUpdates, setClickUpdates] = useState(false);
  const [clickOpenMessages, setClickMessages] = useState(false);
  const [clickOpenOptions, setClickOptions] = useState(false);

  const onClickUpdates = () => {
    setClickUpdates((openState) => !openState);
  };

  const onClickMessages = () => {
    console.log("konnichiwa messages");
    setClickMessages((openState) => !openState);
  };

  const onClickOptions = () => {
    console.log("konnichiwa options");
    setClickOptions((openState) => !openState);
  };
  return (
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
          <input placeholder="Search" type="text" />
        </div>
      </div>
      <div className="header__menuItems">
        <div className="header__notification" onClick={onClickUpdates}>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          {clickOpenUpdates ? (
            <div className="header__notification__dropdown">
              <div className="header__notification__dropdown updates">
                <h1>Updates</h1>
              </div>
            </div>
          ) : null}
        </div>
        <div className="header__messages" onClick={onClickMessages}>
          <IconButton>
            <TextsmsIcon />
          </IconButton>
          {clickOpenMessages ? (
            <div className="header__messages__sidenav">
              <div className="header__message__intro">
                <h1> Messages HELLO</h1>
              </div>
            </div>
          ) : null}
        </div>
        {/* //profile picture later */}
        <IconButton>
          {/* // will contain link to profile page */}
          <FaceIcon />
        </IconButton>
        <div className="header__options" onClick={onClickOptions}>
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
