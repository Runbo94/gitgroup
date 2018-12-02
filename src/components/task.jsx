import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const Container = styled.div`
  margin-bottom: 8px;
  word-wrap: break-word;
`;
/**
 *   border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
 */

class Task extends Component {
  state = {};
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {provided => (
          <Container
            className="card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            innerRef={provided.innerRef}
          >
            <header className="card-header">
              <p className="card-header-title">{this.props.task.title}</p>
            </header>
            <div className="card-content">
              <div className="content">
                <ReactMarkdown source={this.props.task.body} />
                {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
              </div>
            </div>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
