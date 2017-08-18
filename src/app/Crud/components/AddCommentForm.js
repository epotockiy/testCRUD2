import React     from 'react';
import PropTypes from 'prop-types';

export class AddCommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputTitleChange = this.handleInputTitleChange.bind(this);
    this.handleInputBodyChange  = this.handleInputBodyChange.bind(this);
    this.onAddClick             = this.onAddClick.bind(this);

    this.state = {
      inputTitle: '',
      inputBody: ''
    };
  }

  handleInputTitleChange(event) {
    this.setState({
      inputTitle: event.target.value
    });
  }

  handleInputBodyChange(event) {
    this.setState({
      inputBody: event.target.value
    });
  }

  onAddClick(event) {
    event.preventDefault();
    this.props.addComment(this.state.inputTitle, this.state.inputBody);

    this.setState({
      inputTitle: '',
      inputBody: ''
    });
  }

  render() {
    return (
      <form className="mt-3">
        <div className="row justify-content-center">
          <div className="form-group col-lg-3 col-md-12 col-sm-12">
            <input
              type="text"
              id="comment-title"
              className="form-control"
              placeholder="Title"
              value={this.state.inputTitle}
              onChange={this.handleInputTitleChange}
            />
          </div>

          <div className="form-group col-lg-5 col-md-12 col-sm-12">
            <input
              type="text"
              id="comment-body"
              className="form-control"
              placeholder="Text"
              value={this.state.inputBody}
              onChange={this.handleInputBodyChange}
            />
          </div>

          <div className=" col-lg-2 col-md-12 col-sm-12">
            <button
              type="submit"
              className="btn btn-success"
              onClick={this.onAddClick}
              disabled={!this.state.inputBody.length || !this.state.inputTitle.length}>
              Add comment
            </button>
          </div>
        </div>
      </form>
    );
  }
}

AddCommentForm.propTypes = {
  addComment: PropTypes.func
};
