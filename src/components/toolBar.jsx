import React, { Component } from "react";
import Moment from "moment";
import { KanbanService } from "./../services/kanbanService";
import { ProjectService } from "./../services/projectService";

class ToolBar extends Component {
  state = {
    kanbans: [],
    selectedKanban: {}
  };

  setSelectedKanban = kanbanId => {
    const kanbans = [...this.state.kanbans];
    kanbans.map(kanban => {
      if (kanban._id === kanbanId) {
        const selectedKanban = { ...this.state.selectedKanban };
        selectedKanban.due = kanban.due;
        this.setState({ selectedKanban });
      }
    });
  };

  /**current page: Overview,  */
  currentPage = () => {
    if (window.location.pathname.match(/^\/kanban/)) {
      return "kanban";
    } else if (window.location.pathname === "/") {
      return "overview";
    }
  };

  currentProject = () => {
    const projectId = this.props.projectId;
  };

  componentDidMount = async () => {};

  componentWillReceiveProps = async nextProps => {
    console.log("tool bar update");
    if (
      window.location.pathname.match(/^\/kanban/) &&
      nextProps.projectId !== "" &&
      nextProps.kanbanId &&
      nextProps.kanbanId !== ""
    ) {
      const theKanbans = (await new KanbanService().getKanbansOfProject(
        nextProps.projectId
      )).data;
      this.setState({ kanbans: theKanbans });
      this.setSelectedKanban(nextProps.kanbanId);
    }
  };

  handleKanbanIdChanged = e => {
    this.props.handleKanbanIdChanged(e.target.value);
    this.setSelectedKanban(e.target.value);
  };

  kanbanToolBar = () => {
    const { kanbans, selectedKanban } = this.state;
    return (
      <React.Fragment>
        <div className="column is-paddingless has-text-right">
          <div className="has-text-right">
            <span className="is-size-7 has-text-grey-light">
              Due Day:&nbsp;
              {Moment(selectedKanban.due).format("dddd, MMMM Do YYYY, h:mm a")}
              &nbsp;&nbsp;
            </span>
            <a
              className="button is-light is-small is-marginless"
              onClick={this.props.openNewKanbanModal}
            >
              Add
            </a>
            <a className="button is-light is-small is-marginless">Edit</a>
          </div>
        </div>
        <div className="column is-1 is-paddingless">
          <div className="field">
            <div className="control">
              <div className="select is-small">
                <select onChange={this.handleKanbanIdChanged}>
                  {kanbans &&
                    kanbans.map(kanban => (
                      <option key={kanban._id} value={kanban._id}>
                        {kanban.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="columns is-marginless">
          <div className="column is-4 is-paddingless">
            <nav className="breadcrumb is-small" aria-label="breadcrumbs">
              <ul>
                <li>
                  <a>GitGroup</a>
                </li>
                <li>
                  <a>Documentation</a>
                </li>
                <li className="is-active">
                  <a>{this.currentPage()}</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* kanban tool bar */}

          {window.location.pathname.match(/^\/kanban/) && this.kanbanToolBar()}
        </div>
      </React.Fragment>
    );
  }
}

export default ToolBar;
