import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { hot } from 'react-hot-loader';
import configureStore from '../redux/configureStore.js';

let store = configureStore();

const ProvidedApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default hot(module)(ProvidedApp);
