import React                   from 'react';
import { Link                } from 'react-router-dom';
import { connect             } from 'react-redux';
import { Comment             } from './Comment';
import { Loader              } from './Loader';
import CrudForm                from './CrudForm';
import PropTypes               from 'prop-types';
import * as dataReducerActions from './../actions/DataReducerActions';
import {
  Card,
  CardHeader,
  CardBlock,
  CardTitle,
  CardText
} from 'reactstrap';

class TweetDetail extends React.Component {
  constructor(props) {
    super(props);

    this.onAddComment = this.onAddComment.bind(this);
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.props.getUsers()
        .then(() => {
          this.props.getTweetComments(this.props.tweets[this.props.currentTweet].id);
        });
    } else {
      this.props.getTweetComments(this.props.tweets[this.props.currentTweet].id);
    }
  }

  onAddComment(data) {
    this.props.addComment({
      postId: this.props.tweets[this.props.currentTweet].id,
      id:     Math.floor(Math.random() * 1000 + 501),
      name:   data.title,
      email:  Math.random().toString(32).substr(2, 10),
      body:   data.body
    });
  }

  render() {
    return (
      <div>
        {!this.props.isFetching ? (
          <div className="m-3">
            <div className="row p-3">
              <div className="col-md-1">
                <Link className="btn btn-primary" to='/tweets/1'>Back</Link>
              </div>

              <div className="col-md-5">
                <Link className="nav-link" to={'/user/' + this.props.tweets[this.props.currentTweet].userId}>
                  Posted by: {this.props.tweets[this.props.currentTweet].userId} {this.props.users[this.props.tweets[this.props.currentTweet].userId - 1].name}
                </Link>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="row">
                  <div className="col-11">
                    <CardTitle>
                      #{this.props.tweets[this.props.currentTweet].id} {this.props.tweets[this.props.currentTweet].title}
                    </CardTitle>
                  </div>

                  <div className="col-1">
                    <Link
                      role="button"
                      className="btn btn-info"
                      to='/form/edit'>
                      Edit
                    </Link>
                  </div>
                </div>
              </CardHeader>

              <CardBlock>
                <CardText className='p-3'>
                  {this.props.tweets[this.props.currentTweet].body}
                </CardText>
              </CardBlock>
            </Card>

            <div className="row">
              <div className="col-8 ml-auto mr-auto mt-3 p-5 bg-light">
                <h4 className="text-center">Add new comment</h4>
                <CrudForm
                  onSubmitClick={this.onAddComment}
                  type={'comment'}
                />
              </div>
            </div>

            <h4 className="text-center p-3">Comments:</h4>

            {this.props.comments.map((comment, index) => {
              return (
                <Comment
                  key={index}
                  comment={comment}
                  onDeleteComment={() => this.props.deleteComment(index)}
                  onUpdateComment={(body) => {
                    this.props.updateComment({
                      ...this.props.comments[index],
                      body: body
                    },
                    index);
                  }}
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
  tweets:           PropTypes.array,
  comments:         PropTypes.array,
  users:            PropTypes.array,
  currentTweet:     PropTypes.number,
  isFetching:       PropTypes.bool,
  getUsers:         PropTypes.func,
  getTweetComments: PropTypes.func,
  deleteComment:    PropTypes.func,
  addComment:       PropTypes.func,
  updateComment:    PropTypes.func
};

TweetDetail.defaultProps = {
  tweets: [],
  comments: [],
  users: [],
  currentTweet: 1,
  isFetching: true
};

const mapStateToProps = (state) => {
  return {
    isFetching:   state.isFetching,
    tweets:       state.tweets,
    comments:     state.comments,
    users:        state.users,
    currentTweet: state.currentTweet
  };
};

const mapDispatchToProps = {
  setComments:      dataReducerActions.setComments,
  getUsers:         dataReducerActions.getUsers,
  getTweetComments: dataReducerActions.getTweetComments,
  deleteComment:    dataReducerActions.deleteComment,
  addComment:       dataReducerActions.addComment,
  updateComment:    dataReducerActions.updateComment
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetDetail);
