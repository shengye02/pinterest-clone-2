import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Mainboard from "./Mainboard";
import UserBoards from "./UserBoards";
import unsplash from "../api/unsplash";
import db from "../firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";

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
      console.log(searchedPins, "what is in searchedPins?");
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
    console.log("now at App");
    let boards = [];
    db.collection("boards").onSnapshot((snapshot) => {
      snapshot.doc.map((board) => {
        boards.push(board.data());
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
            <Mainboard getBoards={getMyBoards} pins={pins} />
          </Route>
          <Route path="/userBoards">
            <Header onSubmit={onSearchSubmit} />
            <UserProfileHeader />
            {/* UserBoards needs the already pinned boardPin */}
            <UserBoards boards={boards} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
