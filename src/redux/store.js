import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { weatherReducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export let store = createStore(
	weatherReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
