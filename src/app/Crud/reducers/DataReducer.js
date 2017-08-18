import {
  SET_TWEETS,
  SET_COMMENTS,
  SET_CURRENT_TWEET,
  SET_USERS,
  GET_TWEETS,
  ADD_TWEET,
  UPDATE_TWEET,
  DELETE_TWEET,
  GET_TWEET_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  GET_USERS,
  GET_USER,
  REQUEST_DATA,
  RECEIVE_DATA
} from './../actions/actionTypes';

const DataReducer = (
  state = {
    isFetching: false,
    tweets: [],
    comments: [],
    currentTweet: 1,
    users: []
  },
  action) => {
  switch (action.type) {

  case SET_TWEETS:
    return {
      ...state,
      tweets: action.payload,
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
      currentTweet: action.payload,
      isFetching: false
    };

  case SET_USERS:
    return {
      ...state,
      users: action.payload,
      isFetching: false
    };

  case GET_TWEETS:
    return action.payload;

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
        ...state.tweets.slice(1, action.payload.id),
        action.payload,
        ...state.tweets.slice(action.payload.id + 1, state.tweets.length)
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

  case GET_TWEET_COMMENTS:
    return action.payload;

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
        ...state.comments.slice(1, action.payload.id),
        action.payload,
        ...state.comments.slice(action.payload.id + 1, state.comments.length)
      ],
      isFetching: false
    };

  case DELETE_COMMENT:
    return {
      ...state,
      comments: [
        ...state.comments.slice(1, action.payload),
        ...state.comments.slice(action.payload + 1, state.comments.length)
      ],
      isFetching: false
    };

  case GET_USERS:
    return action.payload;

  case GET_USER:
    return action.payload;

  case REQUEST_DATA:
    console.log('here');
    return {
      ...state,
      isFetching: true
    };

  case RECEIVE_DATA:
    return {
      ...state,
      isFetching: false,
      [action.type]: action.payload
    };

  default:
    return state;
  }
};

export default DataReducer;
