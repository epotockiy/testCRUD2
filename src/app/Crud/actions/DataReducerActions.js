import {
  SET_TWEETS,
  SET_COMMENTS,
  SET_CURRENT_TWEET,
  SET_USERS,
  SET_ALL_TWEETS,
  SET_USER_TWEETS,
  ADD_TWEET,
  ADD_COMMENT,
  UPDATE_TWEET,
  UPDATE_COMMENT,
  DELETE_TWEET,
  DELETE_COMMENT,
  REQUEST_DATA
} from './actionTypes';

function handleServerResponse(response) {
  if (response.status > 199 && response.status < 301) {
    return response.json();
  } else {
    console.warn('Error. Server responded with status:', response.status);
  }
}

export function requestData() {
  return {
    type: REQUEST_DATA
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
    type: SET_ALL_TWEETS,
    payload: tweets
  };
}

export function getAllTweets() {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts')
      .then(
        response => handleServerResponse(response),
        error => console.log('An error occurred. Check your fetch request.', error)
      )
      .then(tweets => dispatch(_receiveAllTweets(tweets)));
  };
}

function _getUserTweets(tweets) {
  return {
    type: SET_USER_TWEETS,
    payload: tweets
  };
}

export function getUserTweets(id) {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts?userId=' + id)
      .then(
        response => handleServerResponse(response),
        error => console.log('An error occurred. Check your fetch request.', error)
      )
      .then(tweets => dispatch(_getUserTweets(tweets)));
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
        response => handleServerResponse(response),
        error => console.log('An error occurred. Check your fetch request.', error)
      )
      .then(() => dispatch(_addTweet(tweet)));
  };
}

function _updateTweet(tweet, index) {
  return {
    type: UPDATE_TWEET,
    payload: tweet,
    index: index
  };
}

export function updateTweet(tweet, index) {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(
        response => handleServerResponse(response),
        error => console.log('An error occurred. Check your fetch request.', error)
      )
      .then(() => dispatch(_updateTweet(tweet, index)));
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
    return fetch('http://jsonplaceholder.typicode.com/posts/' + (index + 1), {method: 'DELETE', cache: 'reload'})/*id*/
      .then(
        response => handleServerResponse(response),
        error => console.log('An error occurred. Check your fetch request.', error)
      )
      .then(() => dispatch(_deleteTweet(index)));
  };
}

function _setTweetComments(comments) {
  return {
    type: SET_COMMENTS,
    payload: comments
  };
}

export function getTweetComments(id) {
  return function(dispatch) {
    return fetch('http://jsonplaceholder.typicode.com/posts/' + id + '/comments')
      .then(
        response => handleServerResponse(response),
        error => console.log('An error occurred. Check your fetch request.', error)
      )
      .then(comments => dispatch(_setTweetComments(comments)));
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
    return fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(
        response => handleServerResponse(response),
        error => console.log('An error occurred. Check your fetch request.', error)
      )
      .then(() => dispatch(_addComment(comment)));
  };
}

function _updateComment(comment, index) {
  return {
    type: UPDATE_COMMENT,
    payload: comment,
    index: index
  };
}

export function updateComment(comment, index) {
  return function(dispatch) {
    return fetch('http://jsonplaceholder.typicode.com/posts', {method: 'POST', cache: 'reload'})
      .then(
        response => handleServerResponse(response),
        error => console.log('An error occurred. Check your fetch request.', error)
      )
      .then(() => dispatch(_updateComment(comment, index)));
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
    return fetch('http://jsonplaceholder.typicode.com/posts/' + (id + 1), {method: 'DELETE', cache: 'reload'})
      .then(
        response => handleServerResponse(response),
        error => console.log('An error occurred. Check your fetch request.', error)
      )
      .then(() => dispatch(_deleteComment(id)));
  };
}

function _receiveUsers(users) {
  return {
    type: SET_USERS,
    payload: users
  };
}

export function getUsers() {
  return function(dispatch) {
    dispatch(requestData());

    return fetch('http://jsonplaceholder.typicode.com/users')
      .then(
        response => handleServerResponse(response),
        error => console.log('An error occurred. Check your fetch request.', error)
      )
      .then(users => dispatch(_receiveUsers(users)));
  };
}
