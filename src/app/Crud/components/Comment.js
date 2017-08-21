import React              from 'react';
import PropTypes          from 'prop-types';
import { _updateComment } from './TweetService';

export class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onCommentEdit     = this.onCommentEdit.bind(this);

    this.state = {
      isEditing: false,
      commentInput: ''
    };
  }

  onCommentEdit(event) {
    event.preventDefault();

    if (this.state.isEditing) {
      this.props.onUpdateComment(this.state.commentInput);
    }

    if (this.state.commentInput.length) {
      this.props.comment.body = this.state.commentInput;
    } else {
      this.setState({
        commentInput: this.props.comment.body
      });
    }

    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  handleInputChange(event) {
    this.setState({
      commentInput: event.target.value
    });
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-10">
          <div className="card m-2">
            <div className="card-header">
              <h5>#{this.props.comment.id} {this.props.comment.name}</h5>
              <p>By: <strong>{this.props.comment.email}</strong></p>
            </div>
            <div className="card-body">
              {this.state.isEditing ? (
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="comment"
                    rows="3"
                    value={this.state.commentInput}
                    onChange={this.handleInputChange}>
                  </textarea>
                </div>
              ) : (
                <p>{this.props.comment.body}</p>
              )}

              <a href="#"
                onClick={this.onCommentEdit}
                className="btn btn-primary">
                {this.state.isEditing ? 'Save' : 'Edit'}
              </a>
              <a href="#"
                onClick={(e) => { e.preventDefault(); this.props.onDeleteComment(); }}
                className="btn btn-danger ml-2">
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  onDeleteComment: PropTypes.func,
  onUpdateComment: PropTypes.func
};
