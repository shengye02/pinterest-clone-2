import React from "react";
import "./Mainboard.css";
import "./Pin.css";
import Pin from "./Pin";
import { isCompositeComponent } from "react-dom/cjs/react-dom-test-utils.production.min";

function Mainboard(props) {
  const { images } = props;
  console.log(images, "what is in images?");
  const hairColors = [
    "fuchsia",
    "green",
    "pink",
    "lilac",
    "blue",
    "orange",
    "purple",
    "silver",
  ];

  return (
    <div className="mainboard">
      {images.map((image) => {
        return <Pin key={image.id} image={image} />;
      })}
    </div>
  );
}

export default Mainboard;
