import initialState from '../store.js';


var reducer = {};

reducer.loading = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOWLOADING':
            return Object.assign({}, state.loading, {
                show: true,
                msg: action.msg ? action.msg : '加载中'
            });
        case 'HIDELOADING':
            return Object.assign({}, state.loading, {
                show: false,
                msg: null
            });
        default:
            return state;
    }
}

reducer.alert = (state = initialState, action) => {
    switch (action.type) {
        case 'ALERT':
            return Object.assign({}, state.alert, {
                show: true,
                msg: action.msg ? action.msg : '提示信息'
            });
        case 'HIDEALERT':
            return Object.assign({}, state.alert, {
                show: false,
                msg: null
            });
        default:
            return state;
    }
}



export default reducer;
