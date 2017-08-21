import React     from 'react';
import { Link }  from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="row justify-content-center m-5">
      <div className="card border-info text-center">
        <div className="card-header">
          <h1 className="display-2 mt-3 text-info">404</h1>
          <h2 className="display-4 text-info">NOT FOUND</h2>
        </div>
        <div className="card-body">
          <h4>The page you are looking for does not exist</h4>
          <ul className="nav nav-pills nav-fill mt-3">
            <li className="nav-item">
              <Link to='/tweets/1' className="nav-link">Go home</Link>
            </li>
            <li className="nav-item">
              <Link to='/create' className="nav-link">Add new post</Link>
            </li>
            <li className="nav-item">
              <Link to='/users' className="nav-link">Users</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
