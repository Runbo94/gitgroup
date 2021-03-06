import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import GithubAuth from "./githubAuth";

class Navbar extends Component {
  state = {};

  handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    window.location = "/";
  };

  render() {
    const { user } = this.props;
    return (
      <nav className="navbar is-dark" aria-label="main navigation">
        <div className="navbar-brand">
          <img
            className="clickable"
            src={process.env.PUBLIC_URL + "/images/brand.png"}
            alt="Bulma: a modern CSS framework based on Flexbox"
            onClick={() => {
              window.location = "/";
            }}
          />

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            {!user && (
              <div className="navbar-item">
                <GithubAuth />
              </div>
            )}
            {user && (
              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/" className="navbar-link">
                  <i className="fas fa-user" />
                </Link>
                <div className="navbar-dropdown is-boxed">
                  <a className="navbar-item">Signed in as {user.name}</a>
                  <hr className="navbar-divider" />
                  <Link to="/profile" className="navbar-item">
                    Your profile
                  </Link>
                  <a className="navbar-item">Your projects</a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">Help</a>
                  <a className="navbar-item">Settings</a>
                  <a className="navbar-item" onClick={this.handleLogout}>
                    Log out
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <SearchBox />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
