import React from "react";

function Pin(props) {
  const { image } = props;
  console.log(props.image, "what is props here again at Pin?");

  const { description, urls, width, height, alt_description } = image;
  console.log(width, height, description, " this image");
  return (
    <div className="pin__container">
      <div className="pin__img__container">
        <img src={urls.regular} />
        <div className="img__buttons"></div>
      </div>
      <div className="pin__text__container">{description}</div>
    </div>
  );
}

export default Pin;
