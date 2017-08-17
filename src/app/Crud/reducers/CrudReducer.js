import { SET_TWEETS, SET_COMMENTS, SET_CURRENT_TWEET } from './../actions/actionTypes';

const CrudReducer = (
state = {
  tweets: [],
  comments: [],
  currentTweet: 1
},
action) => {
  switch (action.type) {
    case SET_TWEETS:
      return {
        ...state,
        tweets: action.payload
      };

    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };

    case SET_CURRENT_TWEET:
      return {
        ...state,
        currentTweet: action.payload
      };

    default:
      return state;
  }
};

export default CrudReducer;
