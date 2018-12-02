import React, { Component, Fragment } from "react";
import styled from "styled-components";

const Tab = styled.div`
  height: 8em;
  width: 2em;
  border-radius: 0px 10px 10px 0px;
  background-color: lightgrey;
  cursor: pointer;
`;

const VP = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-rl;
  min-height: 8em;
  line-height: 2em;
`;

class SideTabs extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <Tab onClick={this.props.openSideProjectList}>
          <VP>projects</VP>
        </Tab>
      </Fragment>
    );
  }
}

export default SideTabs;
