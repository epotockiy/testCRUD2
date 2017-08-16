import React       from 'react';
import { connect } from 'react-redux';
import { Tweet   } from './Tweet';
import * as crudReducerActions from './../actions/CrudReducerActions';

class TweetList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getTweets();
  }

  getTweets() {
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(
        tweets => {
          this.props.setTweets(tweets);
        }
      );
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
      <div className="row">
        {this.props.tweets.map(tweet => {
          return (
            <Tweet
              key={tweet.id + Math.random().toString(32).substr(2, 5)}
              tweet={tweet}
              onDeleteClick={this.onDeleteClick.bind(this, tweet.id)}
              setCurrentTweet={() => { this.props.setCurrentTweet(tweet.id); }}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets,
    comments: state.comments
  }
};

const mapDispatchToProps = {
  setTweets: crudReducerActions.setTweets,
  setComments: crudReducerActions.setComments,
  setCurrentTweet: crudReducerActions.setCurrentTweet
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);
