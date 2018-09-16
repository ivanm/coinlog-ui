import { RSAA } from 'redux-api-middleware';
import * as types from '../types'

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

export const fetch24ByCurrencyCached = (currency, fiatCurrency,cachedData) => {
    return {
        type: types.FETCH_24_CURRENCY_GET_CACHE,
        currency,
        fiatCurrency,
        cachedData
    }
}

export const fetch24ByCurrencyTry = (currency, fiatCurrency, trend) => {
    return {
        type: types.FETCH_24_CURRENCY_TRY,
        currency,
        fiatCurrency,
        trend
    }
}

export const orderCurrencies = (order, sort) => {
    return {
        type: types.ORDER_CURRENCIES,
        order,
        sort
    }
}
