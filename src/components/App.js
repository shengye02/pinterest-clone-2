import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Mainboard from "./Mainboard";
import UserBoards from "./UserBoards";
import unsplash from "../api/unsplash";
import db from "../firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [pins, setNewPins] = useState([]);

  const makeAPICall = (term) => {
    return unsplash.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
    });
  };

  const onSearchSubmit = (term) => {
    console.log(term, "what is in term?");
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

  useEffect(() => {
    getMyNewPins();
  }, []);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/mainboard">
            <div className="app__header">
              <Header onSubmit={onSearchSubmit} />
            </div>
            <div className="app__body">
              <Mainboard pins={pins} />
            </div>
          </Route>
          <Route path="/userBoards">
            <div className="app__header">
              <Header onSubmit={onSearchSubmit} />
            </div>
            <div className="app__body">
              <UserBoards pins={pins} />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// focus first on Mainboard loading up;
// so useEffect
// last ten searchTerms
// make APIcalls for those searchTerms
// collect all those images in 1 one array
// then sent them to the MainBoard in shuffled order.
// so they will be displayed in a shuffled order.

// let newPins = [];
//     let test = [];
//     db.collection("terms").onSnapshot((snapshot) =>
//       snapshot.docs.map((doc) => {
//         let test = newPins.push(doc.data().term);
//       })
//     );
//     console.log(test, "what is in newPins upon loading?");

// promises.push(
//   makeAPICAll(doc.data().term).then((res) => {
//     pinsData.push({
//       id: doc.id,
//       data: doc.data(),
//       info: res.data,
//     });
//   })
// );

// wat moet newPins worden?
// laatste tien searchTerms
// daarvan alle api calls doen
// dit resultaat in een array stoppen en shufflene.
// dan const newPins met als value deze array zetten zodat het in het Moodboard te zien is.
