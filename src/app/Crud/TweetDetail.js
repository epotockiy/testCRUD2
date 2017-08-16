import React              from 'react';
import { Link           } from 'react-router-dom';
import { Comment        } from './Comment';
import { AddCommentForm } from './AddCommentForm';
import queryString        from 'query-string';

export class TweetDetail extends React.Component {
  isTitleEditing = false;
  isBodyEditing  = false;

  constructor(props) {
    super(props);

    this.onEditTitleClick            = this.onEditTitleClick.bind(this);
    this.onEditBodyClick             = this.onEditBodyClick.bind(this);
    this.handleTweetTitleInputChange = this.handleTweetTitleInputChange.bind(this);
    this.handleTweetBodyInputChange  = this.handleTweetBodyInputChange.bind(this);
    this.addComment                  = this.addComment.bind(this);

    this.state = {
      tweet: {},
      comments: [],
      user: {},
      tweetTitleInput: '',
      tweetBodyInput: '',
      commentInput: ''
    };
  }

  componentDidMount() {
    this.getTweet();
    this.getTweetComments();
  }

  getTweet() {
    /* Checks if id is a number, then we can fetch tweet info from server. If not means that we created a new tweet. */
    if ((+this.props.match.params.id).toString() !== this.props.match.params.id) {
      this.setState({
        tweet: JSON.parse(queryString.parse(this.props.location.search).tweet)
      }, () => {
        this.getUser();
        this.getTweetComments();
      });
    } else {
      fetch('http://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id)
        .then(res => res.json())
        .then(tweet => {
          this.setState({
            tweet: tweet
          }, () => {
            this.getUser();
            this.getTweetComments();
          });
        });
    }
  }

  getTweetComments() {
    fetch('http://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id + '/comments')
      .then(res => res.json())
      .then(comments => {
        this.setState({
          comments: comments
        });
      });
  }

  getUser() {
    fetch('http://jsonplaceholder.typicode.com/users/' + this.state.tweet.userId)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user: user
        });
      });
  }

  updateTweet() {
    console.log('updating tweet #' + this.state.tweet.id);
    fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(res => res.json());
  }

  onEditTitleClick(event) {
    event.preventDefault();

    if (this.isTitleEditing) {
      this.updateTweet();
    }

    /* Checks and updated form input(if we passes empty string it saves previous input). */
    if (this.state.tweetTitleInput.length) {
      let tempTweet = this.state.tweet;
      tempTweet.title = this.state.tweetTitleInput;
      this.setState({
        tweet: tempTweet
      });
    } else {
      this.setState({
        tweetTitleInput: this.state.tweet.title
      });
    }

    this.isTitleEditing = !this.isTitleEditing;
  }

  onEditBodyClick(event) {
    event.preventDefault();

    if (this.isBodyEditing) {
      this.updateTweet();
    }

    /* Checks and updated form input(if we passes empty string it saves previous input). */
    if (this.state.tweetBodyInput.length) {
      let tempTweet = this.state.tweet;
      tempTweet.body = this.state.tweetBodyInput;
      this.setState({
        tweet: tempTweet
      });
    } else {
      this.setState({
        tweetBodyInput: this.state.tweet.body
      });
    }

    this.isBodyEditing = !this.isBodyEditing;
  }

  handleTweetTitleInputChange(event) {
    this.setState({
      tweetTitleInput: event.target.value
    });
  }

  handleTweetBodyInputChange(event) {
    this.setState({
      tweetBodyInput: event.target.value
    });
  }

  addComment(title, body) {
    let newComment = {
      postId: this.state.tweet.id,
      id: Math.floor(Math.random() * 100),
      name: title,
      body: body,
      email: Math.random().toString(32).substr(2, 10)
    };

    console.log('adding new comment:', newComment);
    fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: [newComment, ...this.state.comments]
        });
      });
  }

  deleteComment(id) {
    console.log('deleting comment #' + id);

    fetch('http://jsonplaceholder.typicode.com/posts/1', {method: 'DELETE', cache: 'reload'})
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < this.state.comments.length; ++i) {
          if (this.state.comments[i].id === id) {
            let tempTweets = this.state.comments;
            tempTweets.splice(i, 1);
            this.setState({
              comments: tempTweets
            });
            break;
          }
        }
      });
  }

  render() {
    return (
      <div className="m-3">
        <div className="row p-3">
          <div className="col-md-1">
            <Link className="btn btn-primary" to={'/tweets'}>Back</Link>
          </div>

          <div className="col-md-10">
            <h3 className="text-center">Posted by: {this.state.user.id} {this.state.user.name}</h3>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            {this.isTitleEditing ? (
              <div>
                <textarea className="form-control"
                          name="comment"
                          rows="1"
                          value={this.state.tweetTitleInput}
                          onChange={this.handleTweetTitleInputChange}>
                </textarea>

                <a className="small-text"
                   href="#"
                   onClick={this.onEditTitleClick}>
                  Save
                </a>
              </div>
            ) : (
             <h4 className="card-title">
               #{this.state.tweet.id} {this.state.tweet.title}
               <a className="small-text" href="#" onClick={this.onEditTitleClick}>Change title</a>
             </h4>
            )}
          </div>

          <div className="card-body">
            {!this.isBodyEditing ? (
              <p className="card-text">
                {this.state.tweet.body}
                <a href="#" onClick={this.onEditBodyClick} className="small-text ml-1">Edit tweet</a>
              </p>
            ) : (
              <div>
                <textarea className="form-control"
                          name="comment"
                          rows="3"
                          value={this.state.tweetBodyInput}
                          onChange={this.handleTweetBodyInputChange}>
                </textarea>
                <a href="#" onClick={this.onEditBodyClick} className="small-text ml-1">Save</a>
              </div>
            )}
          </div>
        </div>

        <h4 className="text-center p-3">Comments:</h4>

        <AddCommentForm addComment={this.addComment} />

        {this.state.comments.map(comment => {
          return (
              <Comment
                key={comment.id + Math.random().toString(32).substr(2, 5)}
                comment={comment}
                onDeleteComment={() => this.deleteComment(comment.id)}
              />
          );
        })}

      </div>
    );
  }
}
