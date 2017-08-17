import React                   from 'react';
import { connect             } from 'react-redux';
import { Tweet               } from './Tweet';
import * as crudReducerActions from './../actions/CrudReducerActions';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDataLoaded: false,
      user: {}
    }
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    fetch('http://jsonplaceholder.typicode.com/users/' + this.props.match.params.id)
      .then(res => res.json())
      .then(user => {
        this.setState({
          isDataLoaded: true,
          user: user
        });
      });
  }

  onDeleteClick(id) {
    console.log('deleting tweet #' + id);

    fetch('http://jsonplaceholder.typicode.com/posts/1', {method: 'DELETE', cache: 'reload'})
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < this.props.tweets.length; ++i) {
          if (this.props.tweets[i].id === id) {
            this.props.setTweets([
              ...this.props.tweets.slice(0, i),
              ...this.props.tweets.slice(i + 1)
            ]);
            break;
          }
        }
      });
  }

  render() {
    return (
      <div className="container mt-3">
        {this.state.isDataLoaded ? (
          <div className="card col-12 ml-auto mr-auto">
            <div className="card-body">
              <img className="rounded float-left m-3" style={{"width": "10em"}} src="http://pngimages.net/sites/default/files/users--blue-flag-png-image-100720.png" alt="Card image cap" />
              <div className="mt-3 mb-3 ml-5 mr-5">
                <h4 className="card-title">{this.state.user.name}</h4>
                <p className="card-text">Nickname: {this.state.user.username}</p>
                <h5 className="card-text">Email: {this.state.user.email}</h5>
                <h6 className="card-text">Address: {this.state.user.address.street}, {this.state.user.address.suite}</h6>
              </div>
            </div>
            <div className="card-body">
              <h4 className="text-center">Tweets:</h4>
              <div className="row">
                {this.props.tweets.map(tweet => {
                  if (tweet.userId === this.state.user.id) {
                    return (
                      <Tweet
                        key={tweet.id + Math.random().toString(32).substr(2, 5)}
                        tweet={tweet}
                        onDeleteClick={() => { this.onDeleteClick(tweet.id); }}
                        setCurrentTweet={() => { this.props.setCurrentTweet(tweet.id); }}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
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
  setTweets: crudReducerActions.setTweets,
  setCurrentTweet: crudReducerActions.setCurrentTweet
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
