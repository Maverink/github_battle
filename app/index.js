import React from "react";
import ReactDOM from "react-dom";
import Popular from "./components/Popular";

import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Popular></Popular>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
