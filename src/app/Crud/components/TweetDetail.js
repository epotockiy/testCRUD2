import React                   from 'react';
import { Link                } from 'react-router-dom';
import { connect             } from 'react-redux';
import { Comment             } from './Comment';
import { AddCommentForm      } from './AddCommentForm';
import { Loader              } from './Loader';
import PropTypes               from 'prop-types';
import * as crudReducerActions from './../actions/CrudReducerActions';

class TweetDetail extends React.Component {
  constructor(props) {
    super(props);

    this.addComment = this.addComment.bind(this);

    this.state = {
      currentTweet: {},
      user: {},
      commentInput: '',
      isDataLoaded: false
    };
  }

  componentDidMount() {
    this.setState({
      currentTweet: this.props.tweets.find(tweet => {
        return (tweet.id === this.props.currentTweet)
      })
    }, () => {
      this.getUser();
      this.getTweetComments();
    });
  }

  getTweetComments() {
    if (!this.props.comments.length) {
      fetch('http://jsonplaceholder.typicode.com/posts/' + this.state.currentTweet.id + '/comments')
        .then(res => res.json())
        .then(comments => {
          this.props.setComments(comments);
          this.setState({
            isDataLoaded: true
          });
        });
    } else {
      this.setState({
        isDataLoaded: true
      });
    }
  }

  getUser() {
    fetch('http://jsonplaceholder.typicode.com/users/' + this.state.currentTweet.userId)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user: user
        });
      });
  }

  addComment(title, body) {
    let newComment = {
      postId: this.state.currentTweet.id,
      id: Math.floor(Math.random() * 1000 + 501),
      name: title,
      body: body,
      email: Math.random().toString(32).substr(2, 10)
    };

    console.log('adding new comment:', newComment);
    fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(res => res.json())
      .then(res => {
        this.props.setComments([newComment, ...this.props.comments]);
      });
  }

  deleteComment(id) {
    console.log('deleting comment #' + id);

    fetch('http://jsonplaceholder.typicode.com/posts/1', {method: 'DELETE', cache: 'reload'})
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < this.props.comments.length; ++i) {
          if (this.props.comments[i].id === id) {
            this.props.setComments([
              ...this.props.comments.slice(0, i),
              ...this.props.comments.slice(i + 1)
            ]);
            break;
          }
        }
      });
  }

  render() {
    return (
        <div>
          {this.state.isDataLoaded ? (
            <div className="m-3">
              <div className="row p-3">
                <div className="col-md-1">
                  <Link className="btn btn-primary" to={'/tweets'}>Back</Link>
                </div>

                <div className="col-md-5">
                  <Link className="nav-link" to={'/user/' + this.state.user.id}>
                    Posted by: {this.state.user.id} {this.state.user.name}
                  </Link>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-11">
                      {this.props.tweets.length > 0 ? (
                          <h4 className="card-title">
                            #{this.state.currentTweet.id} {this.state.currentTweet.title}
                          </h4>
                      ) : (
                          <h3>Loading...</h3>
                      )}
                    </div>

                    <div className="col-1">
                      <Link
                          role="button"
                          className="btn btn-info"
                          to={'/edit'}>
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  {this.props.tweets.length > 0 ? (
                      <p className="card-text">
                        {this.state.currentTweet.body}
                      </p>
                  ) : (
                      <h3>Loading...</h3>
                  )}
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
          ) : (
            <Loader/>
          )}
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
