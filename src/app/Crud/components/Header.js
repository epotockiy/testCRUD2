import React       from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="container navbar-nav">
          <NavLink className="nav-item nav-link" activeClassName="active" to="/tweets">Home</NavLink>
          <NavLink className="nav-item nav-link" activeClassName="active" to="/form/add">Add post</NavLink>
          <NavLink className="nav-item nav-link" activeClassName="active" to="/users">Users</NavLink>
        </div>
      </div>
    </nav>
  );
};
