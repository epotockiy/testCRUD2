import React                   from 'react';
import { Link                } from 'react-router-dom';
import { connect             } from 'react-redux';
import { Comment             } from './Comment';
import { AddCommentForm      } from './AddCommentForm';
import { Loader              } from './Loader';
import PropTypes               from 'prop-types';
import * as dataReducerActions from './../actions/DataReducerActions';

class TweetDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      commentInput: '',
      isDataLoaded: false
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.currentTweet)
      .then(res => {
        console.log(res);
      });
    this.setState({
      user:{}
    }, () => {
      console.log(this.state.user);
      this.props.getTweetComments(this.props.currentTweet)
        .then(() => {
          this.setState({
            isDataLoaded: true
          });
        });
    });
  }

  render() {
    return (
      <div>
        {!this.state.isDataLoaded ? (
          <div className="m-3">
            <div className="row p-3">
              <div className="col-md-1">
                <Link className="btn btn-primary" to='/tweets'>Back</Link>
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
                    <h4 className="card-title">
                      #{this.props.tweets[this.props.currentTweet].id} {this.props.tweets[this.props.currentTweet].title}
                    </h4>
                  </div>

                  <div className="col-1">
                    <Link
                      role="button"
                      className="btn btn-info"
                      to='/edit'>
                      Edit
                    </Link>
                  </div>
                </div>
              </div>

              <div className="card-body">
                {this.props.tweets.length > 0 ? (
                  <p className="card-text">
                    {this.props.tweets[this.props.currentTweet].body}
                  </p>
                ) : (
                  <h3>Loading...</h3>
                )}
              </div>
            </div>

            <h4 className="text-center p-3">Comments:</h4>

            <AddCommentForm
              addComment={(title, body) => {
                this.props.addComment({
                  postId: this.state.currentTweet.id,
                  id: Math.floor(Math.random() * 1000 + 501),
                  name: title,
                  body: body,
                  email: Math.random().toString(32).substr(2, 10)
                });
              }}
            />

            {this.props.comments.map(comment => {
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onDeleteComment={() => this.props.deleteComment(comment.id)}
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
  tweets: PropTypes.array,
  comments: PropTypes.array,
  currentTweet: PropTypes.number,
  isFetching: PropTypes.bool,
  getUser: PropTypes.func,
  getTweetComments: PropTypes.func,
  deleteComment: PropTypes.func,
  addComment: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
    tweets: state.tweets,
    comments: state.comments,
    currentTweet: state.currentTweet
  };
};

const mapDispatchToProps = {
  setComments: dataReducerActions.setComments,
  getUser: dataReducerActions.getUser,
  getTweetComments: dataReducerActions.getTweetComments,
  deleteComment: dataReducerActions.deleteComment,
  addComment: dataReducerActions.addComment
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetDetail);
