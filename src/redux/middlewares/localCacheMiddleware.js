import * as dataActions from '../actions/dataActions';
import ls from 'localstorage';
import * as types from '../types'

const refreshLimit = 3600;

export default store => next => action => {
    const cache = new ls('');
    if (action.type == types.FETCH_24_CURRENCY_TRY) {
        const cacheKey = action.trend+'-'+action.currency+'-'+action.fiatCurrency;
        const state = store.getState();
        let [err, cachedData] = cache.get(cacheKey);
        if (cachedData && (cachedData.lastUpdated > (Math.floor(Date.now()/1000) - refreshLimit))) {
            store.dispatch(dataActions.fetch24ByCurrencyCached(action.currency, action.fiatCurrency, cachedData));
        } else {
            store.dispatch(dataActions.fetch24ByCurrency(action.currency, action.fiatCurrency)).then(r => {
                const storedData = store.getState();
                cachedData = storedData.data.historic24[action.currency];
                cachedData.lastUpdated = Math.floor(Date.now()/1000);
                cache.put(cacheKey, cachedData);
            });
        }
    } else {
        return next(action);
    }
};

