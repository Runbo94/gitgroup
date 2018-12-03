import React, { Component } from "react";

import styled from "styled-components";
import Moment from "moment";

const Container = styled.div`
  margin-bottom: 8px;
  word-wrap: break-word;
`;

class KanbanCard extends Component {
  state = {};
  render() {
    return (
      <Container className="card">
        <header className="card-header">
          <p className="card-header-title">{this.props.kanban.name}</p>
        </header>
        <div className="card-content">
          <div className="content">
            Due:{" "}
            {Moment(this.props.kanban.due).format("dddd, MMMM Do YYYY, h:mm a")}
            {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
          </div>
        </div>
      </Container>
    );
  }
}

export default KanbanCard;
