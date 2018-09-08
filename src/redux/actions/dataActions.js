import { RSAA } from 'redux-api-middleware';
import * as types from '../types'

export const fetchCryptocompare = (currencies, fiatCurrency) => {

    const currenciesQuery = currencies.join(',');

    return ({
        [RSAA]: {
            types: [
                {
                    type: types.FETCH_CRYPTOCOMPARE_REQUEST,
                    meta: { fiatCurrency }
                },
                {
                    type: types.FETCH_CRYPTOCOMPARE_SUCCESS,
                    meta: { fiatCurrency }
                },
                {
                    type: types.FETCH_CRYPTOCOMPARE_FAILURE,
                    meta: { fiatCurrency }
                }
            ],
            endpoint: 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms='+currenciesQuery+'&tsyms='+fiatCurrency,
            method: 'GET'
        }
    })
}

export const fetch24ByCurrency = (currency, fiatCurrency) => {
    return ({
        [RSAA]: {
            types: [
                {
                    type: types.FETCH_24_CURRENCY_REQUEST,
                    meta: { currency, fiatCurrency }
                },
                {
                    type: types.FETCH_24_CURRENCY_SUCCESS,
                    meta: { currency, fiatCurrency }
                },
                {
                    type: types.FETCH_24_CURRENCY_FAILURE,
                    meta: { currency, fiatCurrency }
                }
            ],
            endpoint: 'https://min-api.cryptocompare.com/data/histohour?fsym='+currency+'&tsym='+fiatCurrency+'&limit=24',
            method: 'GET'
        }
    })
}


export const orderCurrencies = (order, sort) => {
    return {
        type: types.ORDER_CURRENCIES,
        order,
        sort
    }
}
