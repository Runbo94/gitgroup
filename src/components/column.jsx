import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";

import "react-perfect-scrollbar/dist/css/styles.css";

const Container = styled.div`
  margin: 0px 8px 8px 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  min-width: 250px;
  max-width: 250px;
  background-color: lightgrey;

  vertical-align: top;
  min-height: 600px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
`;

class Column extends Component {
  state = {};
  render() {
    return (
      <PerfectScrollbar className="kanban-column">
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <TaskList
              ref={provided.innerRef}
              innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.tasks &&
                this.props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </PerfectScrollbar>
    );
  }
}

export default Column;
