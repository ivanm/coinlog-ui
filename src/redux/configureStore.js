import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import dataReducer from './reducers/dataReducer';
import { apiMiddleware } from 'redux-api-middleware';
import localCacheMiddleware from './middlewares/localCacheMiddleware';

const configureStore = (initialState) => {
    const store = createStore(
        combineReducers({
            data: dataReducer
        }),
        initialState,
        compose(
            applyMiddleware(...[
                localCacheMiddleware,
                apiMiddleware
            ]),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;
}

export default configureStore;
