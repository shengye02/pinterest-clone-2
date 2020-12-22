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
  const [boardsToPick, setBoardsToPick] = useState([]);

  const callUnsplashAPI = (term) => {
    return unsplash.get("/search/photos", {
      params: { query: term },
    });
  };

  const onSearchSubmit = (term) => {
    callUnsplashAPI(term).then((res) => {
      setNewPins(res.data.results);
    })

    // let promises = [];
    // let searchedPins = [];
    // promises.push(
    //   callUnsplashAPI(term).then((res) => {
    //     searchedPins.push(res.data.results);
    //   })
    // );
    // Promise.all(promises).then(() => {
    //   setNewPins(searchedPins);
    // });
  };

  const getMyNewPins = () => {
    db.collection('terms').onSnapshot(snapshot => {
      if (snapshot.docs.length >= 10) {
        snapshot.docs = snapshot.docs.slice(      //what is this for??
          snapshot.docs.length - 5,
          snapshot.docs.length
        )
      }
    })


    let promises = [];
    let pinData = [];

    db.collection("terms").onSnapshot((snapshot) => {
      let snapshotData = snapshot.docs;

      if (snapshotData.length >= 10) {
        snapshotData = snapshotData.slice(      //what is this for??
          snapshotData.length - 5,
          snapshotData.length
        );
      }
      snapshotData.map((doc) => {
        promises.push(
          callUnsplashAPI(doc.data().term).then((res) => {
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

  const getMyBoards = async () => {
    await db.collection("boards").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        setBoards({
          id: doc.id,
          data: doc.data(),
        });
      })
    })

    if (boards.length >= 3) {
      setBoardsToPick(boards.slice(Math.max(boards.length - 3, 0)))
    }

    // Promise.all(boards).then((results) => {

    //   boardsToPick = results;
    //   if (results.length >= 3) {
    //     boardsToPick = results.slice(Math.max(results.length - 3, 0));
    //   }
    //   setBoardsToPick(boardsToPick);
    //   setBoards(boards);
    // });
  };

  useEffect(() => {
    getMyNewPins();
    getMyBoards();
  }, []);

  return (
    <div className="app">
      <Router>
        <Switch>

          <Route path="/userBoard">
            <Header onSubmit={onSearchSubmit} />
            <UserBoard boards={boards} />
          </Route>

          <Route path="/boardPage/:boardId">
            <Header onSubmit={onSearchSubmit} />
            <BoardPage />
          </Route>

          <Route path="/">
            <Header onSubmit={onSearchSubmit} />
            <Mainboard
              pins={pins}
              getBoards={getMyBoards}
              boardsToPick={boardsToPick}
            />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
