import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authenticateReducer from './Authenticate/reducer';
import notesReducer from './Notes/reducer';

const reducer = combineReducers({authenticateReducer, notesReducer});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
