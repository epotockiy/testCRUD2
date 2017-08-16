import React from 'react';
import { Tweet } from './Tweet';
import queryString from 'query-string';

export class TweetList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: []
    }
  }

  componentDidMount() {
    this.getTweets();
  }

  getTweets() {
    fetch('http://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(
            tweets => {
              this.setState({
                tweets: tweets
              });

              this.checkForNewTweet();
            }
        );
  }

  checkForNewTweet() {
    const newTweet = queryString.parse(this.props.location.search).tweet ?
        JSON.parse(queryString.parse(this.props.location.search).tweet) :
        '';

    if (newTweet) {
      this.setState({
        tweets: [newTweet, ...this.state.tweets]
      });
    }
  }

  onDeleteClick(id) {
    console.log('deleting tweet #' + id);

    fetch('http://jsonplaceholder.typicode.com/posts/1', {method: 'DELETE', cache: 'reload'})
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < this.state.tweets.length; ++i) {
          if (this.state.tweets[i].id === id) {
            let tempTweets = this.state.tweets;
            tempTweets.splice(i, 1);
            this.setState({
              tweets: tempTweets
            });
            break;
          }
        }
      });
  }

  render() {
    return (
      <div className="row">
        {this.state.tweets.map(tweet => {
          return (
            <Tweet
                key={tweet.id + Math.random().toString(32).substr(2, 5)}
                tweet={tweet}
                onDeleteClick={this.onDeleteClick.bind(this, tweet.id)}
            />
          );
        })}
      </div>
    );
  }
}
