import React    from 'react';
import { Link } from 'react-router-dom';

export class AddTweetForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputBodyChange  = this.handleInputBodyChange.bind(this);
    this.handleInputTitleChange = this.handleInputTitleChange.bind(this);

    this.state = {
      inputTitle: '',
      inputBody: ''
    }
  }

  onSubmit(event) {
    event.preventDefault();

    let newTweet = {
      userId: Math.floor(Math.random() * 10),
      id: Math.random().toString(32).substr(2, 10),
      title: this.state.inputTitle,
      body: this.state.inputBody
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

  render() {
    return (
      <div className="container">
        <h3 className="m-3 text-center">Post new tweets</h3>

        <form className="m-2"  onSubmit={this.onSubmit}>
          <div className="row justify-content-center">
            <div className="form-group col-md-3">
              <input type="text"
                     id="tweet-title"
                     className="form-control"
                     placeholder="Title"
                     value={this.state.inputTitle}
                     onChange={this.handleInputTitleChange}
              />
            </div>

            <div className="form-group col-md-5">
              <input type="text"
                     id="tweet-body"
                     className="form-control"
                     placeholder="Text"
                     value={this.state.inputBody}
                     onChange={this.handleInputBodyChange}
              />
            </div>

            <div className="col-md-1">
              <Link role="button"
                    className="btn btn-danger"
                    disabled={!this.state.inputTitle.length || !this.state.inputBody.length}
                    to={'/tweets?tweet=' + JSON.stringify({
                      userId: Math.floor(Math.random() * 10),
                      id: Math.random().toString(32).substr(2, 10),
                      title: this.state.inputTitle,
                      body: this.state.inputBody
                    })}>
                Post
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
