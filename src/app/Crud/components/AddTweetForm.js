import React                   from 'react';
import { connect             } from 'react-redux';
import { Link                } from 'react-router-dom';
import * as crudReducerActions from './../actions/CrudReducerActions';

class AddTweetForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputBodyChange  = this.handleInputBodyChange.bind(this);
    this.handleInputTitleChange = this.handleInputTitleChange.bind(this);
    this.handleInputUserChange  = this.handleInputUserChange.bind(this);
    this.addTweet               = this.addTweet.bind(this);

    this.state = {
      inputTitle: '',
      inputBody: '',
      inputUser: 1
    }
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

  handleInputUserChange(event) {
    this.setState({
      inputUser: event.target.value
    });
  }

  addTweet() {
    console.log(this.state.inputTitle);
    let newTweet = {
      userId: this.state.inputUser,
      id: Math.floor(Math.random() * 1000 + 501),
      title: this.state.inputTitle,
      body: this.state.inputBody
    };

    console.log('adding new tweet: ', newTweet);
    fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(res => res.json())
      .then(res => {
        this.props.setTweets([newTweet, ...this.props.tweets]);
      });
  }

  render() {
    return (
      <div className="container">
        <h3 className="m-3 text-center">Post new tweets</h3>

        <form className="mt-2 ml-auto mr-auto form-inline justify-content-between col-8">
          <div className="form-group">
            <input
              type="text"
              id="tweet-title"
              className="form-control"
              placeholder="Title"
              value={this.state.inputTitle}
              onChange={this.handleInputTitleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              id="tweet-body"
              className="form-control"
              placeholder="Text"
              value={this.state.inputBody}
              onChange={this.handleInputBodyChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="user" className="h5 mr-2">User id</label>
            <select
              className="form-control"
              id="user"
              value={this.state.inputUser}
              onChange={this.handleInputUserChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>

          <Link role="button"
                to={'/tweets'}
                className="btn btn-danger float-right"
                disabled={!this.state.inputTitle.length || !this.state.inputBody.length}
                onClick={this.addTweet}>
            Post
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets
  }
};

const mapDispatchToProps = {
  setTweets: crudReducerActions.setTweets
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTweetForm);
