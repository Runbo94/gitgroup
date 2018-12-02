import React, { Component } from "react";

class StatusOverview extends Component {
  state = {};
  render() {
    return (
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Repositories</p>
            <p className="title">3,456</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Issues</p>
            <p className="title">123</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Kanbans</p>
            <p className="title">456K</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Finished Kanbans</p>
            <p className="title">789</p>
          </div>
        </div>
      </nav>
    );
  }
}

export default StatusOverview;
