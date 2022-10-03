import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loaderReducer } from './reducers/loader';
import { usersReducer } from './reducers/users';

const rootReducer = combineReducers({
    loaderReducer,
    usersReducer
});

// Create Store
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;