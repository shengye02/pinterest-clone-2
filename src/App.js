import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Mainboard from "./Mainboard";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
        <div className="app__container">
          <Mainboard />
        </div>
      </div>
    </div>
  );
}

export default App;
