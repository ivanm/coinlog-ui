import initialState from '../initialState';
import * as types from '../types'
import ls from 'localstorage';
import { changePercentage, latestPrice } from '../../helpers';

const dataReducer = (state = initialState.data, action) => {
    switch (action.type) {

        case types.FETCH_24_CURRENCY_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }

        case types.FETCH_24_CURRENCY_SUCCESS: {
            const { fiatCurrency, currency } = action.meta;
            let currencyData = {
                date: action.payload['Data'].map(el => (new Date(el.time*1000)).toISOString() ),
                open: action.payload['Data'].map(el => el.open),
                close: action.payload['Data'].map(el => el.close),
                low: action.payload['Data'].map(el => el.low),
                high: action.payload['Data'].map(el => el.high),
                name: currency
            }

            const trend = changePercentage(currencyData),
                price = latestPrice(currencyData);

            currencyData = {
                ...currencyData,
                trend,
                trendFormatted: String(trend.toFixed(2)),
                price,
                priceFormatted: '$ '+String(price.toFixed(2))
            }

            const historic24 = {
                ...state.historic24,
                [currency]: currencyData
            }

            return {
                ...state,
                historic24,
                loading: false
            };
        }

        case types.FETCH_24_CURRENCY_FAILURE: {
            return {
                ...state,
                loading: false
            };
        }

        case types.FETCH_24_CURRENCY_GET_CACHE: {
            const historic24 = {
                ...state.historic24,
                [action.currency]: action.cachedData
            }
            return {
                ...state,
                historic24
            };
        }

        case types.ORDER_CURRENCIES: {
            const { order, sort } = action;
            let { currencies, historic24 } = state;
            const ascOrder = (a, b) => { return isNaN(historic24[a][order]) ? historic24[a][order].localeCompare(historic24[b][order]): (historic24[a][order] - historic24[b][order]) },
                descOrder = (a, b) => { return isNaN(historic24[a][order]) ? historic24[b][order].localeCompare(historic24[a][order]): (historic24[b][order] - historic24[a][order]) },
                orderFunc = (sort == 'asc') ? ascOrder : descOrder;

            if (Object.keys(historic24).length == currencies.length) {
                currencies = currencies.sort(orderFunc);
            }
            return {
                ...state,
                currencies,
                loading: false
            };
        }

        default:
            return state;
    }
}

export default dataReducer;
