import React, { Component } from "react";

class ProjectList extends Component {
  state = {
    projects: []
  };

  search = () => {};

  changeToTheProjectId = projectId => {
    // window.location = `/kanban/${project.id}`;
    this.props.changeProjectId(projectId);
  };

  render() {
    const {
      user,
      openNewProjectModal,
      closeSideProjectList,
      projectId
    } = this.props;
    return (
      <React.Fragment>
        <nav className="panel">
          <div className="panel-heading">
            projects
            <a
              className="delete float-right"
              aria-label="close"
              onClick={closeSideProjectList}
            />
          </div>
          <div className="panel-block">
            <div className="control has-icons-left">
              <input
                className="input is-small"
                type="text"
                placeholder="search"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>
            </div>
          </div>
          {user &&
            user.projects.map(project => (
              <a
                className={
                  project.id === projectId
                    ? "panel-block is-active"
                    : "panel-block"
                }
                key={project.id}
                onClick={() => this.changeToTheProjectId(project.id)}
              >
                <span className="panel-icon">
                  <i className="fas fa-project-diagram" aria-hidden="true" />
                </span>
                {project.name}
              </a>
            ))}
          <div className="panel-block">
            <button
              className="button is-link is-outlined is-fullwidth"
              onClick={openNewProjectModal}
            >
              New Project
            </button>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default ProjectList;
