import initialState from '../initialState';
import * as types from '../types'
import ls from 'localstorage';
import { changePercentage, latestPrice } from '../../helpers';

const dataReducer = (state = initialState.data, action) => {
    switch (action.type) {

        case types.FETCH_1H_CURRENCY_REQUEST:
        case types.FETCH_24H_CURRENCY_REQUEST:
        case types.FETCH_7D_CURRENCY_REQUEST:
        case types.FETCH_30D_CURRENCY_REQUEST:
            return {
                ...state,
                loading: true
            };

        case types.FETCH_1H_CURRENCY_SUCCESS:
        case types.FETCH_24H_CURRENCY_SUCCESS:
        case types.FETCH_7D_CURRENCY_SUCCESS:
        case types.FETCH_30D_CURRENCY_SUCCESS:
            const { fiatCurrency, currency, trend } = action.meta;
            let historicKeySuccess = `historic${trend}`;
            let currencyData = {
                date: action.payload['Data'].map(el => (new Date(el.time*1000)).toISOString() ),
                open: action.payload['Data'].map(el => el.open),
                close: action.payload['Data'].map(el => el.close),
                low: action.payload['Data'].map(el => el.low),
                high: action.payload['Data'].map(el => el.high),
                name: currency
            }

            const trendNum = changePercentage(currencyData),
                price = latestPrice(currencyData);

            currencyData = {
                ...currencyData,
                trend: trendNum,
                trendFormatted: String(trendNum.toFixed(2)),
                price,
                priceFormatted: '$ '+String(price.toFixed(2))
            }

            return {
                ...state,
                [historicKeySuccess]: {
                    ...state[historicKeySuccess],
                    [currency]: currencyData
                },
                loading: false
            };

        case types.FETCH_1H_CURRENCY_FAILURE:
        case types.FETCH_24H_CURRENCY_FAILURE:
        case types.FETCH_7D_CURRENCY_FAILURE:
        case types.FETCH_30D_CURRENCY_FAILURE:
            return {
                ...state,
                loading: false
            };


        case types.FETCH_1H_CURRENCY_GET_CACHED:
        case types.FETCH_24H_CURRENCY_GET_CACHED:
        case types.FETCH_7D_CURRENCY_GET_CACHED:
        case types.FETCH_30D_CURRENCY_GET_CACHED:
            let historicKeyCached = `historic${action.trend}`;
            return {
                ...state,
                [historicKeyCached]: {
                    ...state[historicKeyCached],
                    [action.currency]: action.cachedData
                }
            };

        case types.ORDER_CURRENCIES: {
            const { order, sort, trend} = action;
            let { currencies } = state;
            let historicKeyOrder = `historic${trend}`;
            const ascOrder = (a, b) => { return isNaN(state[historicKeyOrder][a][order]) ? state[historicKeyOrder][a][order].localeCompare(state[historicKeyOrder][b][order]): (state[historicKeyOrder][a][order] - state[historicKeyOrder][b][order]) },
                descOrder = (a, b) => { return isNaN(state[historicKeyOrder][a][order]) ? state[historicKeyOrder][b][order].localeCompare(state[historicKeyOrder][a][order]): (state[historicKeyOrder][b][order] - state[historicKeyOrder][a][order]) },
                orderFunc = (sort == 'asc') ? ascOrder : descOrder;

            if (Object.keys(state[historicKeyOrder]).length == currencies.length) {
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
