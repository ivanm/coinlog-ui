import initialState from '../initialState';

export default function cryptocompareApiReducer(state = initialState.cryptocompareApi, action) {

    switch (action.type) {

        case types.GET_ALL_TRENDS: {
            return {
                ...state,
            };
        }

        default:
            return state;
    }
}
