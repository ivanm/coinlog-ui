import { RSAA } from 'redux-api-middleware';
import * as types from '../types';

export const fetchCurrency = (currency, fiatCurrency, trend) => {
    switch (trend) {
        case '1h':
            return {
                [RSAA]: {
                    types: [
                        {
                            type: types.FETCH_1H_CURRENCY_REQUEST,
                            meta: { currency, fiatCurrency, trend }
                        },
                        {
                            type: types.FETCH_1H_CURRENCY_SUCCESS,
                            meta: { currency, fiatCurrency, trend }
                        },
                        {
                            type: types.FETCH_1H_CURRENCY_FAILURE,
                            meta: { currency, fiatCurrency, trend }
                        }
                    ],
                    endpoint:
                        'https://min-api.cryptocompare.com/data/histominute?fsym=' +
                        currency +
                        '&tsym=' +
                        fiatCurrency +
                        '&limit=60',
                    method: 'GET'
                }
            };
        case '24h':
            return {
                [RSAA]: {
                    types: [
                        {
                            type: types.FETCH_24H_CURRENCY_REQUEST,
                            meta: { currency, fiatCurrency, trend }
                        },
                        {
                            type: types.FETCH_24H_CURRENCY_SUCCESS,
                            meta: { currency, fiatCurrency, trend }
                        },
                        {
                            type: types.FETCH_24H_CURRENCY_FAILURE,
                            meta: { currency, fiatCurrency, trend }
                        }
                    ],
                    endpoint:
                        'https://min-api.cryptocompare.com/data/histohour?fsym=' +
                        currency +
                        '&tsym=' +
                        fiatCurrency +
                        '&limit=24',
                    method: 'GET'
                }
            };
        case '7d':
            return {
                [RSAA]: {
                    types: [
                        {
                            type: types.FETCH_7D_CURRENCY_REQUEST,
                            meta: { currency, fiatCurrency, trend }
                        },
                        {
                            type: types.FETCH_7D_CURRENCY_SUCCESS,
                            meta: { currency, fiatCurrency, trend }
                        },
                        {
                            type: types.FETCH_7D_CURRENCY_FAILURE,
                            meta: { currency, fiatCurrency, trend }
                        }
                    ],
                    endpoint:
                        'https://min-api.cryptocompare.com/data/histoday?fsym=' +
                        currency +
                        '&tsym=' +
                        fiatCurrency +
                        '&limit=7',
                    method: 'GET'
                }
            };
        case '30d':
            return {
                [RSAA]: {
                    types: [
                        {
                            type: types.FETCH_30D_CURRENCY_REQUEST,
                            meta: { currency, fiatCurrency, trend }
                        },
                        {
                            type: types.FETCH_30D_CURRENCY_SUCCESS,
                            meta: { currency, fiatCurrency, trend }
                        },
                        {
                            type: types.FETCH_30D_CURRENCY_FAILURE,
                            meta: { currency, fiatCurrency, trend }
                        }
                    ],
                    endpoint:
                        'https://min-api.cryptocompare.com/data/histoday?fsym=' +
                        currency +
                        '&tsym=' +
                        fiatCurrency +
                        '&limit=30',
                    method: 'GET'
                }
            };
    }
};

export const getCachedCurrency = (
    currency,
    fiatCurrency,
    trend,
    cachedData
) => {
    let type = '';
    switch (trend) {
        case '1h':
            type = types.FETCH_1H_CURRENCY_GET_CACHED;
            break;
        case '24h':
            type = types.FETCH_24H_CURRENCY_GET_CACHED;
            break;
        case '7d':
            type = types.FETCH_7D_CURRENCY_GET_CACHED;
            break;
        case '30d':
            type = types.FETCH_30D_CURRENCY_GET_CACHED;
            break;
    }
    return {
        type,
        currency,
        fiatCurrency,
        trend,
        cachedData
    };
};

export const refreshCurrency = (currency, fiatCurrency, trend) => {
    return {
        type: types.REFRESH_CURRENCY,
        currency,
        fiatCurrency,
        trend
    };
};

export const orderCurrencies = (order, sort, trend) => {
    return {
        type: types.ORDER_CURRENCIES,
        order,
        sort,
        trend
    };
};
