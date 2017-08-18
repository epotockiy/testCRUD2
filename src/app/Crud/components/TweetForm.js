/*
import React                   from 'react';
import PropTypes               from 'prop-types';
import { connect             } from 'react-redux';
import * as crudReducerActions from './../actions/CrudReducerActions';

class TweetForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputTitleChange = this.handleInputTitleChange.bind(this);
    this.handleInputBodyChange  = this.handleInputBodyChange.bind(this);
    this.handleInputUserChange  = this.handleInputUserChange.bind(this);
    this.saveTweet              = this.saveTweet.bind(this);

    this.state = {
      inputTitle: '',
      inputBody: '',
      inputUser: 1,
      type: ''
    };
  }

  componentDidMount() {
    let currentTweet = this.props.tweets.find(tweet => {
      return (tweet.id === this.props.currentTweet);
    });

    this.setState({
      inputTitle: currentTweet.title,
      inputBody:  currentTweet.body,
      inputUser:  currentTweet.userId,
      type:       this.props.match.params.type
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

  saveTweet(event) {
    event.preventDefault();

    console.log('saving tweet #' + this.props.currentTweet);

    fetch('http://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.json())
      .then(() => {
        for (let i = 0; i < this.props.tweets.length; ++i) {
          if (this.props.tweets[i].id === this.props.currentTweet) {
            this.props.setTweets([
              ...this.props.tweets.slice(0, i),
              {
                userId: +this.state.inputUser,
                id: this.props.currentTweet,
                title: this.state.inputTitle,
                body: this.state.inputBody
              },
              ...this.props.tweets.slice(i + 1)
            ]);

            break;
          }
        }
      })
      .then(() => {
        this.props.history.push('/tweet-detail/' + this.props.currentTweet);
      });
  }

  render() {
    return (
      <div className="row mt-5">
        <div className="col-8 ml-auto mr-auto">
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
              <label htmlFor="body" className="h4">Tweet</label>
              <textarea
                className="form-control"
                id="body"
                rows="5"
                value={this.state.inputBody}
                onChange={this.handleInputBodyChange}
              />
            </div>

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

            <button
              className="btn btn-primary"
              onClick={this.saveTweet}
              disabled={!this.state.inputTitle.length || !this.state.inputBody.length}>
              {this.state.type === 'edit' ? 'Save' : 'Post'}
            </button>

            <button
              className="btn btn-danger ml-3"
              onClick={() => {
                if (this.state.type === 'edit') {
                  this.props.history.push('/tweet-detail/' + this.props.currentTweet);
                } else {
                  this.props.history.push('/tweets');
                }
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

TweetForm.propTypes = {
  tweets: PropTypes.array.isRequired,
  currentTweet: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  setTweets: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired()
};

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets,
    currentTweet: state.currentTweet,
    users: state.users
  };
};

const mapDispatchToProps = {
  setTweets: crudReducerActions.setTweets
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetForm);
*/
