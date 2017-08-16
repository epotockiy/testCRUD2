import { SET_TWEETS, SET_COMMENTS, SET_CURRENT_TWEET } from './actionTypes';

export function setTweets(tweets) {
  return {
    type: SET_TWEETS,
    payload: tweets
  };
}

export function setComments(comments) {
  return {
    type: SET_COMMENTS,
    payload: comments
  };
}

export function setCurrentTweet(currentTweet) {
  return {
    type: SET_CURRENT_TWEET,
    payload: currentTweet
  };
}
