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

export const orderCurrencies = (order, sort) => {
    return {
        type: types.ORDER_CURRENCIES,
        order,
        sort
    }
}
