import React, { Component } from "react";

class LoginForm extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="email" placeholder="Email" />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Password" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success">Login</button>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;