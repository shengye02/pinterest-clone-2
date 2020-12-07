import React, { useState } from "react";
import PinterestIcon from "@material-ui/icons/Pinterest";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FaceIcon from "@material-ui/icons/Face";
import TextsmsIcon from "@material-ui/icons/Textsms";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { IconButton } from "@material-ui/core";
import "./Header.css";

function Header(props) {
  const [clickOpenUpdates, setClickUpdates] = useState(false);
  const [clickOpenMessages, setClickMessages] = useState(false);
  const [clickOpenOptions, setClickOptions] = useState(false);
  const [input, setInput] = useState("");

  const onClickUpdates = () => {
    setClickUpdates((openState) => !openState);
  };

  const onClickMessages = () => {
    setClickMessages((openState) => !openState);
  };

  const onClickOptions = () => {
    setClickOptions((openState) => !openState);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(input);
    // searchTerm add it to firebase of the user now.
    // remove another searchTerm at the end (to not have a full list of searchTerms);
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
                <h1> Messages</h1>
              </div>
            </div>
          ) : null}
        </div>
        <IconButton>
          {/* // will contain link to profile page */}
          <FaceIcon />
        </IconButton>
        <div className="header__options" onClick={onClickOptions}>
          <IconButton size="small">
            <KeyboardArrowDownIcon />
          </IconButton>
          {clickOpenOptions ? (
            <div className="header__options__dropdown">
              <div className="header__options__intro">
                <h1> Options</h1>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;

// <form>
// <input
//   value={input}
//   placeholder="Search"
//   type="submit"
//   onChange={(e) => setInput(e.target.value)}
// />
// <button onSubmit={onSearchSubmit} type="submit">
//   Search keyword
// </button>
// </form>
