import React from "react";
import ReactDOM from "react-dom";
import App from './components/App';
import { Provider } from 'react-redux';
import getStore from './getStore.js';

const currencyData = [
    {
        code: 'BTC',
        ammount: 1.5,
        value: 10155.17,
        currencyValue: 'USD',
        trends: {
            hour: 0.3,
            day: 4.0,
            week: 3.6,
            month: -14.7,
        }
    },
    {
        code: 'ETH',
        ammount: 0.6,
        value: 10155.17,
        currencyValue: 'USD',
        trends: {
            hour: -8.3,
            day: -8.0,
            week: -3.6,
            month: -14.7,
        }
    },
    {
        code: 'NANO',
        ammount: 100,
        value: 10155.17,
        currencyValue: 'USD',
        trends: {
            hour: 9.3,
            day: -8.0,
            week: -3.6,
            month: -14.7,
        }
    }
];

// TODO Move to redux store
const currentTrend = 'hour';

const Index = () => <App/>;

let store = getStore();

ReactDOM.render(
    <Provider  store={ store }>
        <Index/>
    </Provider>,
    document.getElementById("app")
);
