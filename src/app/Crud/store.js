import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import DataReducer                      from './reducers/DataReducer';

export default createStore(
  DataReducer,
  applyMiddleware(
    thunkMiddleware
  ));
