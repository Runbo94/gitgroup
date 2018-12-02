import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import styled from "styled-components";
import { IssueService } from "../services/issueService";
import Column from "./column";
import { KanbanService } from "../services/kanbanService";
import { CardService } from "./../services/cardService";

const Container = styled.div`
  display: flex;
`;

class Kanban extends Component {
  state = {
    backLogCol: { id: "backlog", title: "BackLog", cards: [] }, // BackLog column object, include id and title
    // backLogIssues: [], // all the issues got from GitHub
    kanbanId: null, // current kanban ID
    kanban: {}, // format: {_id, name, state, due, projectId, columns:{_id, name, kanbanId}}
    kanbanCols: [] // get from kanban, change name to title in order to use react-beautiful-dnd
  };

  /**get all the issues from GitHub and set it to the backLogCol of the STATE*/
  getAllIssuesAndSetBackLog = async props => {
    const issueService = new IssueService();
    // const projectId = props.match.params.project_id;
    const projectId = props.projectId;
    if (props.user) {
      const username = props.user.name;
      let issues = (await issueService.getAllIssues(username, projectId)).data;
      for (let issue of issues) {
        issue.id = issue.issueId;
        issue.type = "issueCard"; //
      }

      let backLogCol = { ...this.state.backLogCol };
      backLogCol.cards = [];
      for (const issue of issues) {
        backLogCol.cards.push(issue);
      }
      this.setState({ backLogCol });
    }
  };

  /**get kanban and update backlog, saved these to STATE */
  getKanbanAllColsAndSet = async props => {
    const kanbanService = new KanbanService();
    if (props.kanbanId) {
      this.setState({ kanbanId: props.kanbanId });
      const kanban = (await kanbanService.getKanbanById(props.kanbanId)).data;
      this.setState({ kanban }); // get and set the kanban in state

      let kanbanCols = []; // decorated columns array
      for (const column of kanban.columns) {
        const colName = column.name;
        const colId = column._id;
        const cards = column.cards;
        for (let card of cards) {
          // change the _id to id, fix it!!!
          card.id = card._id;
        }
        const kanbanCol = { id: colId, title: colName, cards: cards };
        kanbanCols.push(kanbanCol);
      }
      this.setState({ kanbanCols });

      // update backlog
      let { backLogCol } = { ...this.state };
      if (kanban && kanban.includeIssueIds) {
        backLogCol.cards = backLogCol.cards.filter(
          card => !kanban.includeIssueIds.includes(card.issueId)
        );
        this.setState({ backLogCol });
      }
    }
  };

  // componentWillReceiveProps = async nextProps => {
  //   /**get all the issues to the back log */
  //   await this.getAllIssuesAndSetBackLog(nextProps);

  //   /**get kanban information */
  //   await this.getKanbanAllColsAndSet(nextProps);
  // };

  componentWillReceiveProps = async nextProps => {
    console.log("kanban update");
    if (
      nextProps.user !== this.props.user ||
      nextProps.kanbanId !== this.props.kanbanId ||
      nextProps.projectId !== this.props.projectId
    ) {
      /**get all the issues to the back log */
      await this.getAllIssuesAndSetBackLog(nextProps);

      /**get kanban information */
      await this.getKanbanAllColsAndSet(nextProps);
    }
  };

  /**card drag end handler */
  onDragEnd = async result => {
    const { destination, source, draggableId } = result;
    let { backLogCol, kanbanCols, kanbanId, kanban } = { ...this.state };
    const cardService = new CardService();
    const kanbanService = new KanbanService();

    /**invalid movement */
    if (!destination) return; // not put to another column
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      // put the same place
      return;

    /**valid movement */
    let start; // the start column
    if (source.droppableId === "backlog") start = backLogCol;
    // is backlog column
    else start = kanbanCols.find(col => col.id === source.droppableId); // is kanban column

    let finish; // the finish column
    if (destination.droppableId === "backlog") finish = backLogCol;
    // is backlog column
    else finish = kanbanCols.find(col => col.id === destination.droppableId); // is kanban column

    if (start === finish) {
      //TODO: sort and something else ...
    } else {
      // remove the draggable task from the start
      let card = start.cards.find(card => card.id === draggableId); // the dragged card
      if (start.id !== "backlog") {
        start.cards = start.cards.filter(card => card.id !== draggableId);
        this.setState({ kanbanCols });
        await cardService.deleteTheCard(kanbanId, start.id, card.id);
      }
      // add draggable task to the finish
      if (finish.id !== "backlog") {
        if (card.type && card.type === "issueCard") {
          //create new card to the kanban column
          card = (await cardService.createNewCard(kanbanId, finish.id, {
            issueId: card.issueId,
            title: card.title,
            body: card.body,
            owner: card.owner,
            repos: card.repos,
            state: card.state,
            number: card.number,
            note: ""
          })).data;
          card.id = card._id; // fix it!!!
        } else {
          // original card move to the kanban column
          card.issueId = card.issue_id; // fix this!
          await cardService.createNewCard(kanbanId, finish.id, card);
        }
        finish.cards.splice(destination.index, 0, card);
        this.setState({ kanbanCols });
      }
    }

    await this.getAllIssuesAndSetBackLog(this.props);
    await this.getKanbanAllColsAndSet(this.props);
    // update the backlog
    // const newKanban = (await kanbanService.getKanbanById(kanbanId)).data;
    // this.setState({ kanban: newKanban }); // get and set the kanban in state
    // kanban = newKanban;

    // let newKanbanCols = []; // decorated columns array
    // for (const column of kanban.columns) {
    //   const colName = column.name;
    //   const colId = column._id;
    //   const cards = column.cards;
    //   for (let card of cards) {
    //     // change the _id to id, fix it!!!
    //     card.id = card._id;
    //   }
    //   const kanbanCol = { id: colId, title: colName, cards: cards };
    //   newKanbanCols.push(kanbanCol);
    // }
    // this.setState({ kanbanCols: newKanbanCols });

    // await this.getAllIssuesAndSetBackLog(this.props);
    // backLogCol = { ...this.state.backLogCol };
    // if (kanban && kanban.includeIssueIds) {
    //   backLogCol.cards = backLogCol.cards.filter(
    //     card => !kanban.includeIssueIds.includes(card.issueId)
    //   );
    //   this.setState({ backLogCol });
    // }
  };

  render() {
    let { backLogCol, kanbanCols } = this.state;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          <Column column={backLogCol} tasks={backLogCol.cards} />
          {kanbanCols.map(kanbanCol => {
            return (
              <Column
                key={kanbanCol.id}
                column={kanbanCol}
                tasks={kanbanCol.cards}
              />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}

export default Kanban;
