import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authenticateReducer from './Authenticate/reducer';

const reducer = combineReducers({authenticateReducer});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
