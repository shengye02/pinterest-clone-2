import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Mainboard from "./Mainboard";
import UserBoard from "./UserBoard";
import unsplash from "../api/unsplash";
import db from "../firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BoardPage from "./BoardPage";

function App() {
  const [pins, setNewPins] = useState([]);
  const [boards, setBoards] = useState([]);

  const makeAPICall = (term) => {
    return unsplash.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
    });
  };

  const onSearchSubmit = (term) => {
    let promises = [];
    let searchedPins = [];
    promises.push(
      makeAPICall(term).then((res) => {
        searchedPins.push(res.data.results);
      })
    );
    Promise.all(promises).then(() => {
      setNewPins(searchedPins);
    });
  };

  const getMyNewPins = () => {
    db.collection("terms").onSnapshot((snapshot) => {
      let promises = [];
      let pinData = [];

      let snapshotData = snapshot.docs;
      if (snapshotData.length >= 10) {
        snapshotData = snapshotData.slice(
          snapshotData.length - 5,
          snapshotData.length
        );
      }
      snapshotData.map((doc) => {
        promises.push(
          makeAPICall(doc.data().term).then((res) => {
            let results = res.data.results;
            results.map((object) => {
              pinData.push(object);
            });

            pinData.sort(function (a, b) {
              return 0.5 - Math.random();
            });
          })
        );
      });
      Promise.all(promises).then(() => {
        setNewPins(pinData);
      });
    });
  };

  const getMyBoards = () => {
    let boards = [];
    db.collection("boards").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        boards.push({
          id: doc.id,
          data: doc.data(),
        });
      });
    });
    setBoards(boards);
  };

  useEffect(() => {
    getMyNewPins();
    getMyBoards();
  }, []);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/mainboard">
            <Header onSubmit={onSearchSubmit} />
            <Mainboard pins={pins} getBoards={getMyBoards} />
          </Route>
          <Route path="/userBoard">
            <Header onSubmit={onSearchSubmit} />
            <UserBoard boards={boards} />
          </Route>
          <Route path="/boardPage/:boardId">
            <Header onSubmit={onSearchSubmit} />
            <BoardPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
