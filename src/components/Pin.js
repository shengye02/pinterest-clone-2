import React from "react";

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
          <img src={urls?.regular ? urls.full : "No picture available"} />
          <div className="img__buttons"></div>
          <div className="pin__text__container">
            <p>{description}</p>
          </div>
        </div>
      ) : (
        <div className="pin__containerSmall" key={image.id}>
          <img src={urls?.regular ? urls.full : "No picture available"} />
          <div className="img__buttons"></div>
          <div className="pin__text__container">
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pin;
