import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Tweet = (props) => {
  return (
    <div className="col-md-6 col-sm-6">
      <div className="card m-3">
        <div className="card-header">
          <h4 className="card-title">
            #{props.tweet.id} {props.tweet.title}
          </h4>
        </div>

        <div className="card-body">
          <p className="card-text">
            {props.tweet.body}
          </p>
        </div>

        <div className="card-footer bg-transparent">
          <Link className="btn btn-primary" to={'/tweet-detail/' + props.tweet.id}>Details</Link>
          <a href="#"
             className="btn btn-danger ml-2"
             onClick={(e) => { e.preventDefault(); props.onDeleteClick(); }}>
            Delete
          </a>
        </div>
      </div>
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object,
  onDeleteClick: PropTypes.func
};
