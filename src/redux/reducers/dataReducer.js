import initialState from '../initialState';
import * as types from '../types'

const dataReducer = (state = initialState.data, action) => {
    switch (action.type) {

        case types.FETCH_CRYPTOCOMPARE_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }

        case types.FETCH_CRYPTOCOMPARE_SUCCESS: {

            let currencies = [];
            const json = action.payload;
            const { fiatCurrency } = action.meta;

            for (let currency in json['RAW']) {
                currencies.push({
                    trend: json['RAW'][currency][fiatCurrency]['CHANGEPCT24HOUR'],
                    trendFormatted: json['RAW'][currency][fiatCurrency]['CHANGEPCT24HOUR'].toFixed(2),
                    name: currency,
                    price: json['RAW'][currency][fiatCurrency]['PRICE'],
                    priceFormatted: json['DISPLAY'][currency][fiatCurrency]['PRICE']
                });
            }

            return {
                ...state,
                currencies,
                loading: false
            };
        }

        case types.FETCH_CRYPTOCOMPARE_FAILURE: {
            return {
                ...state,
                loading: false
            };
        }

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
                high: action.payload['Data'].map(el => el.high)
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

        case types.ORDER_CURRENCIES: {

            const { order, sort } = action;
            const ascOrder = (a, b) => { return isNaN(a[order]) ? a[order].localeCompare(b[order]): (a[order] - b[order]) },
                descOrder = (a, b) => { return isNaN(a[order]) ? b[order].localeCompare(a[order]): (b[order] - a[order]) },
                orderFunc = (sort == 'asc') ? ascOrder : descOrder;

            return {
                ...state,
                currencies: state.currencies.sort( orderFunc ),
                loading: false
            };
        }

        default:
            return state;
    }
}

export default dataReducer;
