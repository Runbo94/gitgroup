import React, { Component } from "react";
import { Link } from "react-router-dom";
class Tabs extends Component {
  state = {};

  goToKanban = () => {
    window.location = "/kanban";
  };

  goToOverView = () => {
    window.location = "/";
  };

  render() {
    return (
      <React.Fragment>
        <div className="tabs is-centered is-marginless">
          <ul>
            <li className={window.location.pathname === "/" ? "is-active" : ""}>
              <Link to="/">Overview</Link>
            </li>
            <li
              className={
                window.location.pathname.match(/^\/kanban/) ? "is-active" : ""
              }
            >
              <Link to="/kanban">KanBan</Link>
            </li>
            <li>
              <a>Chart</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
          </ul>
        </div>
        <div className="m-b-3" />
      </React.Fragment>
    );
  }
}

export default Tabs;
