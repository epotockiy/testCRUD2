import React                   from 'react';
import PropTypes               from 'prop-types';

export class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputTitleChange = this.handleInputTitleChange.bind(this);
    this.handleInputBodyChange  = this.handleInputBodyChange.bind(this);
    this.handleInputUserChange  = this.handleInputUserChange.bind(this);

    this.state = {
      inputTitle: '',
      inputBody: '',
      inputUser: 1
    };
  }

  componentDidMount() {
    this.setState({
      inputTitle: this.props.inputTitlePlaceholder,
      inputBody:  this.props.inputBodyPlaceholder,
      inputUser:  this.props.inputUserPlaceholder
    });
  }

  handleInputBodyChange(event) {
    this.setState({
      inputBody: event.target.value
    });
  }

  handleInputUserChange(event) {
    this.setState({
      inputUser: event.target.value
    });
  }

  handleInputTitleChange(event) {
    this.setState({
      inputTitle: event.target.value
    });
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="title" className="h4">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={this.state.inputTitle}
            onChange={this.handleInputTitleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="body" className="h4">Text</label>
          <textarea
            className="form-control"
            id="body"
            rows="5"
            value={this.state.inputBody}
            onChange={this.handleInputBodyChange}
          />
        </div>

        {this.state.type === 'tweet' ? (
          <div className="form-group">
            <label htmlFor="user" className="h4">User id</label>
            <select
              className="form-control"
              id="user"
              value={this.state.inputUser}
              onChange={this.handleInputUserChange}
            >
              {this.state.users.map((user, index) => {
                return (<option value={index}>{user}</option>);
              })}
            </select>
          </div>
        ) : null}

        <button
          className="btn btn-primary"
          onClick={(event) => {
            event.preventDefault();

            this.props.onSubmitClick({
              title: this.state.inputTitle,
              body:  this.state.inputBody,
              user:  this.state.inputUser
            });

            this.setState({
              inputTitle: '',
              inputBody: '',
              inputUser: 1
            });
          }}
          disabled={!this.state.inputTitle.length || !this.state.inputBody.length}>
          {this.state.type === 'comment' ? 'Save' : 'Post'}
        </button>

        {this.props.isShowCancel ? (
          <button
            className="btn btn-danger ml-3"
            onClick={() => { console.log('clicked'); }}
          >
            Cancel
          </button>
        ) : null}
      </form>
    );
  }
}

Form.propTypes = {
  onSubmitClick:         PropTypes.func.isRequired,
  isShowCancel:          PropTypes.bool.isRequired,
  inputUserPlaceholder:  PropTypes.number.isRequired,
  inputTitlePlaceholder: PropTypes.string.isRequired,
  inputBodyPlaceholder:  PropTypes.string.isRequired
};
