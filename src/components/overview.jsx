import React, { Component } from "react";
import CardsOverview from "./cardsOverview";
import StatusOverview from "./statusOverview";

class Overview extends Component {
  state = {};
  render() {
    return (
      <div className="columns is-paddingless">
        <div className="column is-8">
          <StatusOverview
            kanbans={this.props.kanbans}
            projectId={this.props.projectId}
          />
        </div>
        <div className="column is-4">
          <CardsOverview kanbans={this.props.kanbans} />
        </div>
      </div>
    );
  }
}

export default Overview;
