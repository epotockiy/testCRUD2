import React                   from 'react';
import PropTypes               from 'prop-types';
import { connect             } from 'react-redux';
import { Tweet               } from './Tweet';
import { Loader              } from './Loader';
import * as dataReducerActions from './../actions/DataReducerActions';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserTweets(this.props.match.params.id);
  }

  render() {
    return (
      <div className="container mt-3">
        {!this.props.isFetching ? (
          <div className="card col-12 ml-auto mr-auto">
            <div className="card-body">
              <img className="rounded float-left m-3" style={{'width': '10em'}} src="http://pngimages.net/sites/default/files/users--blue-flag-png-image-100720.png" alt="Card image cap" />
              <div className="mt-3 mb-3 ml-5 mr-5">
                <h4 className="card-title">{this.props.users[this.props.match.params.id - 1].name}</h4>
                <p className="card-text">Nickname: {this.props.users[this.props.match.params.id - 1].username}</p>
                <h5 className="card-text">Email: {this.props.users[this.props.match.params.id - 1].email}</h5>
                <h6 className="card-text">Address: {this.props.users[this.props.match.params.id - 1].address.street}, {this.props.users[this.props.match.params.id - 1].address.suite}</h6>
              </div>
            </div>
            <div className="card-body">
              <h4 className="text-center">Tweets:</h4>
              <div className="row">
                {this.props.tweets.map((tweet, index) =>
                  <Tweet
                    key={tweet.id + Math.random().toString(32).substr(2, 5)}
                    tweet={tweet}
                    onDeleteClick={() => { this.props.deleteTweet(index); }}
                    setCurrentTweet={() => {
                      this.props.requestData();
                      this.props.setCurrentTweet(index);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loader/>
        )}
      </div>
    );
  }
}

User.propTypes = {
  tweets:          PropTypes.array,
  users:           PropTypes.array,
  isFetching:      PropTypes.bool,
  deleteTweet:     PropTypes.func,
  setCurrentTweet: PropTypes.func,
  requestData:     PropTypes.func,
  getUserTweets:   PropTypes.func,
  match:           PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    tweets:       state.tweets,
    users:        state.users,
    currentTweet: state.currentTweet,
    isFetching:   state.isFetching
  };
};

const mapDispatchToProps = {
  getUserTweets:    dataReducerActions.getUserTweets,
  setCurrentTweet: dataReducerActions.setCurrentTweet,
  deleteTweet:     dataReducerActions.deleteTweet,
  requestData:     dataReducerActions.requestData
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
