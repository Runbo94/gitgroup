import React, { Component } from "react";
import CardsOverview from "./cardsOverview";
import StatusOverview from "./statusOverview";

class Overview extends Component {
  state = {};
  render() {
    return (
      <div className="columns is-paddingless">
        <div className="column is-8">
          <StatusOverview />
        </div>
        <div className="column is-4">
          <CardsOverview />
        </div>
      </div>
    );
  }
}

export default Overview;
