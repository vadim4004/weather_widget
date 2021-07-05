import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { weatherReducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, weatherReducer);

export let store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export let persistor = persistStore(store);
