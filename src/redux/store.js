import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { weatherReducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export let store = createStore(
	weatherReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

window.__store__ = store;
