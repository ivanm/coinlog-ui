import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import cryptocompareApiReducer from 'redux/reducers/cryptocompareApiReducer';
import apiMiddleware from 'redux/middlewares/apiMiddleware';

export default function getStore(initialState) {
    const store = createStore(
        combineReducers({
            cryptocompareApiReducer
        }),
        initialState,
        compose(
            applyMiddleware(...[
                apiMiddleware
            ]),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;
}

