import {
  SET_TWEETS,
  SET_COMMENTS,
  SET_CURRENT_TWEET,
  SET_USERS,
  GET_TWEETS,
  GET_TWEET_COMMENTS,
  GET_USERS,
  GET_USER,
  ADD_TWEET,
  ADD_COMMENT,
  UPDATE_TWEET,
  UPDATE_COMMENT,
  DELETE_TWEET,
  DELETE_COMMENT,
  REQUEST_DATA,
  RECEIVE_DATA
} from './actionTypes';

function requestData() {
  return {
    type: REQUEST_DATA
  };
}

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

function _receiveAllTweets(tweets) {
  return {
    type: SET_TWEETS,
    payload: tweets
  };
}

export function getAllTweets() {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(tweets => dispatch(_receiveAllTweets(tweets)));
  };
}

function _receiveTweets(tweets) {
  return {
    type: SET_TWEETS,
    payload: tweets
  };
}

export function getTweets(page, limit) {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts?_page=' + (page || 1)+ '&_limit=' + (limit || 10))
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(tweets => dispatch(_receiveTweets(tweets)));
  };
}

function _addTweet(tweet) {
  return {
    type: ADD_TWEET,
    payload: tweet
  };
}

export function addTweet(tweet) {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(() => dispatch(_addTweet(tweet)));
  };
}

function _updateTweet(tweet) {
  return {
    type: UPDATE_TWEET,
    payload: tweet
  };
}

export function updateTweet(tweet) {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(() => dispatch(_updateTweet(tweet)));
  };
}

function _deleteTweet(index) {
  return {
    type: DELETE_TWEET,
    payload: index
  };
}

export function deleteTweet(index) {
  return function(dispatch) {
    return fetch('http://jsonplaceholder.typicode.com/posts/1', {method: 'DELETE', cache: 'reload'})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(() => dispatch(_deleteTweet(index)));
  };
}

function _getTweetComments(comments) {
  return {
    type: GET_TWEET_COMMENTS,
    payload: comments
  };
}

export function getTweetComments(id) {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts/' + id + '/comments')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(comments => dispatch(_getTweetComments(comments)));
  };
}

function _addComment(comment) {
  return {
    type: ADD_COMMENT,
    payload: comment
  };
}

export function addComment(comment) {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(() => dispatch(_addComment(comment)));
  };
}

function _updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    payload: comment
  };
}

export function updateComment(comment) {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(() => dispatch(_updateComment(comment)));
  };
}

function _deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    payload: id
  };
}

export function deleteComment(id) {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts/1', {method: 'DELETE', cache: 'reload'})
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(() => dispatch(_deleteComment(id)));
  };
}

function _getUsers(users) {
  return {
    type: GET_USERS,
    payload: users
  };
}

export function getUsers() {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/users')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(users => dispatch(_getUsers(users)));
  };
}

function _getUser(user) {
  return {
    type: GET_USER,
    payload: user
  };
}

export function getUser(id) {
  return function(dispatch) {
    dispatch(requestData());
    console.log('!!!');

    return fetch('http://jsonplaceholder.typicode.com/users/' + id)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(user => dispatch(_getUser(user)));
  };
}
