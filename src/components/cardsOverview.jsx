import React, { Component } from "react";
import KanbanCard from "./kanbanCard";

class CardsOverview extends Component {
  state = {};
  render() {
    const kanbans = this.props.kanbans.slice(0);
    return (
      <div className="overview-cards-column">
        {kanbans.map(kanban => (
          <KanbanCard kanban={kanban} />
        ))}
      </div>
    );
  }
}

export default CardsOverview;
