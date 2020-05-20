import * as dataActions from '../actions/dataActions';
import ls from 'localstorage';
import * as types from '../types';

const refreshLimit = 300;

export default store => next => action => {
    const cache = new ls('');
    if (action.type == types.REFRESH_CURRENCY) {
        const cacheKey =
            action.trend + '-' + action.currency + '-' + action.fiatCurrency;
        let [err, cachedData] = cache.get(cacheKey);
        if (err) {
            next(action);
        }
        if (
            cachedData &&
            cachedData.lastUpdated >
                Math.floor(Date.now() / 1000) - refreshLimit
        ) {
            store.dispatch(
                dataActions.getCachedCurrency(
                    action.currency,
                    action.fiatCurrency,
                    action.trend,
                    cachedData
                )
            );
        } else {
            store
                .dispatch(
                    dataActions.fetchCurrency(
                        action.currency,
                        action.fiatCurrency,
                        action.trend
                    )
                )
                .then(() => {
                    const storedData = store.getState();
                    cachedData =
                        storedData.data[`historic${action.trend}`][
                            action.currency
                        ];
                    cachedData.lastUpdated = Math.floor(Date.now() / 1000);
                    cache.put(cacheKey, cachedData);
                });
        }
    } else {
        return next(action);
    }
};
