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
} from './../actions/actionTypes';

const DataReducer = (
  state = {
    isFetching: false,
    tweets: [],
    comments: [],
    users: [],
    userTweets: [],
    numberOfTweets: 1,
    currentTweet: 1,
    itemsPerPage: 10
  },
  action) => {
  switch (action.type) {

  case SET_ALL_TWEETS:
    return {
      ...state,
      tweets: action.payload,
      numberOfTweets: action.payload.length,
      isFetching: false
    };

  case SET_TWEETS:
    return {
      ...state,
      tweets: action.payload,
      isFetching: false
    };

  case SET_USER_TWEETS:
    return {
      ...state,
      userTweets: action.payload,
      isFetching: false
    };

  case SET_COMMENTS:
    return {
      ...state,
      comments: action.payload,
      isFetching: false
    };

  case SET_CURRENT_TWEET:
    return {
      ...state,
      currentTweet: action.payload
    };

  case SET_USERS:
    return {
      ...state,
      users: action.payload,
      isFetching: false
    };

  case ADD_TWEET:
    return {
      ...state,
      tweets: [
        action.payload,
        ...state.tweets
      ],
      isFetching: false
    };

  case UPDATE_TWEET:
    return {
      ...state,
      tweets: [
        ...state.tweets.slice(0, action.index),
        action.payload,
        ...state.tweets.slice(action.index + 1, state.tweets.length)
      ],
      isFetching: false
    };

  case DELETE_TWEET:
    return {
      ...state,
      tweets: [
        ...state.tweets.slice(0, action.payload),
        ...state.tweets.slice(action.payload + 1, state.tweets.length)
      ]
    };

  case ADD_COMMENT:
    return {
      ...state,
      comments: [
        action.payload,
        ...state.comments
      ],
      isFetching: false
    };

  case UPDATE_COMMENT:
    return {
      ...state,
      comments: [
        ...state.comments.slice(1, action.index),
        action.payload,
        ...state.comments.slice(action.index + 1, state.comments.length)
      ],
      isFetching: false
    };

  case DELETE_COMMENT:
    return {
      ...state,
      comments: [
        ...state.comments.slice(0, action.payload),
        ...state.comments.slice(action.payload + 1, state.comments.length)
      ],
      isFetching: false
    };

  case REQUEST_DATA:
    return {
      ...state,
      isFetching: true
    };

  default:
    return state;
  }
};

export default DataReducer;
