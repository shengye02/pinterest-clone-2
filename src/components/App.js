import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Mainboard from "./Mainboard";
import unsplash from "../api/unsplash";

function App() {
  const [images, setImages] = useState([]);

  const onSearchSubmit = (term) => {
    console.log(term, "what is in term here?");
    unsplash
      .get("https://api.unsplash.com/search/photos", {
        params: { query: term },
      })
      .then((response) => {
        setImages(response.data.results);
      });
  };

  return (
    <div className="app">
      <div className="app__header">
        <Header onSubmit={onSearchSubmit} />
      </div>
      <div className="app__body">
        <Mainboard images={images} />
      </div>
    </div>
  );
}

export default App;
