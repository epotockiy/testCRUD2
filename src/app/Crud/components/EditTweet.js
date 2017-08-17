import React                   from 'react';
import PropTypes               from 'prop-types';
import { Link                } from 'react-router-dom';
import { connect             } from 'react-redux';
import * as crudReducerActions from './../actions/CrudReducerActions';

class EditTweet extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputTitleChange = this.handleInputTitleChange.bind(this);
    this.handleInputBodyChange  = this.handleInputBodyChange.bind(this);
    this.handleInputUserChange  = this.handleInputUserChange.bind(this);
    this.saveTweet              = this.saveTweet.bind(this);

    this.state = {
      inputTitle: '',
      inputBody: '',
      inputUser: 1
    }
  }

  componentDidMount() {
    this.setState({
      inputTitle: this.props.tweets[this.props.currentTweet - 1].title,
      inputBody:  this.props.tweets[this.props.currentTweet - 1].body,
      inputUser:  this.props.tweets[this.props.currentTweet - 1].userId,
    })
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
      .then(res => {
        for (let i = 0; i < this.props.tweets.length; ++i) {
          if (this.props.tweets[i].id === this.props.currentTweet) {
            this.props.setTweets([
              ...this.props.tweets.slice(0, i),
              {
                userId: +this.state.inputUser,
                id: (i + 1),
                title: this.state.inputTitle,
                body: this.state.inputBody
              },
              ...this.props.tweets.slice(i + 1)
            ]);

            break;
          }
        }
      })
      .then(res => {
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

            <button
              className="btn btn-primary"
              onClick={this.saveTweet}
              disabled={!this.state.inputTitle.length || !this.state.inputBody.length}>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets,
    currentTweet: state.currentTweet
  }
};

const mapDispatchToProps = {
  setTweets: crudReducerActions.setTweets
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTweet);
