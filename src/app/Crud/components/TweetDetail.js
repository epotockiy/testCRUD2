import React                   from 'react';
import { Link                } from 'react-router-dom';
import { connect             } from 'react-redux';
import { Comment             } from './Comment';
import { AddCommentForm      } from './AddCommentForm';
import PropTypes               from 'prop-types';
import * as crudReducerActions from './../actions/CrudReducerActions';

class TweetDetail extends React.Component {
  constructor(props) {
    super(props);

    this.addComment = this.addComment.bind(this);

    this.state = {
      user: {},
      commentInput: ''
    };
  }

  componentDidMount() {
    this.getUser();
    this.getTweetComments();
  }

  getTweetComments() {
    fetch('http://jsonplaceholder.typicode.com/posts/' + this.props.tweets[this.props.currentTweet].id + '/comments')
      .then(res => res.json())
      .then(comments => {
        this.props.setComments(comments);
      });
  }

  getUser() {
    fetch('http://jsonplaceholder.typicode.com/users/' + this.props.tweets[this.props.currentTweet].userId)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user: user
        });
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
            <Link className="text-center" to={'/user/' + this.state.user.id}>Posted by: {this.state.user.id} {this.state.user.name}</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
           <h4 className="card-title">
             #{this.props.tweets[this.props.currentTweet].id} {this.props.tweets[this.props.currentTweet].title}
           </h4>
          </div>

          <div className="card-body">
            <p className="card-text">
              {this.props.tweets[this.props.currentTweet].body}
            </p>
          </div>
        </div>

        <h4 className="text-center p-3">Comments:</h4>

        <AddCommentForm addComment={this.addComment} />

        {this.props.comments.map(comment => {
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

TweetDetail.propTypes = {
  currentTweet: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets,
    comments: state.comments,
    currentTweet: state.currentTweet
  }
};

const mapDispatchToProps = {
  setComments: crudReducerActions.setComments
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetDetail);
