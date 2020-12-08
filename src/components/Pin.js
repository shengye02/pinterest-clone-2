import React from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

function Pin(props) {
  const { image } = props;
  const { urls, height } = image;

  let description = "";
  if (image.description) {
    description = image.description;
  }

  if (description && description.length > 37) {
    let sentence = description.split(".");
    description = sentence[0] + ".";
  }

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
                <h1>Boards</h1>
                <KeyboardArrowDownIcon />
              </div>
              <div class="pin__boards__menu right">
                <h1>Save</h1>
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
                <h1>Boards</h1>
                <KeyboardArrowDownIcon />
              </div>
              <div class="pin__boards__menu right">
                <h1>Save</h1>
              </div>
            </div>
          </div>
          <div className="pin__text__container">
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pin;
