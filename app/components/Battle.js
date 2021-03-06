import React from "react";
import { FaUserFriends, FaFighterJet, FaTrophy } from "react-icons/fa";

function Instructions() {
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two Github Users</h3>
          <FaUserFriends className="bg-light" color="#727272" />
        </li>

        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet className="bg-light" color="#727272" />
        </li>

        <li>
          <h3 className="header-sm">See the winners</h3>
          <FaTrophy className="bg-light" color="#727272" />
        </li>
      </ol>
    </div>
  );
}

export default class Battle extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Instructions />
      </React.Fragment>
    );
  }
}
