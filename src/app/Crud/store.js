import thunkMiddleware from 'redux-thunk';
import DataReducer     from './reducers/DataReducer';
import {
  createStore,
  combineReducers,
  applyMiddleware }    from 'redux';

export default createStore(
  DataReducer,
  applyMiddleware(
    thunkMiddleware
  )
);
