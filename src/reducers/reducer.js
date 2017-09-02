import {
    SEARCH_PRODUCT,
    ADD_TO_CART,
    CLEAR_CART,
    SET_INPUT_KEY,
    GET_INPUT_KEY,
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS,
    SAVE_SEARCH_RESUTLS,
    GET_SEARCH_RESULTS,
    GET_HISTORY,
    TOGGLE_LOADER
} from '../actions/action';

let historyIndex = 0;
const initialState = {
    index: 0,
    query: "",
    isFetching: false,
    searchResults: [],
    cartItems: []
}
let loader = 0;
function searchInterfaceApp(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_LOADER:
            return Object.assign({}, state, {
                loader: !loader
            })
        case GET_HISTORY:
            return Object.assign({}, state, {
                searchResults: action.payload.searchResults
            })
        case GET_SEARCH_RESULTS:
            return Object.assign({}, state, {
                searchResults: action.payload.searchResults
            })
        case SAVE_SEARCH_RESUTLS:
            return Object.assign({}, state, {
                searchResults: action.searchResults
            })
        case REQUEST_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_PRODUCTS:
            return Object.assign({}, state, {
                index: ++historyIndex,
                isFetching: false,
                searchResults: action.searchResults,
                lastUpdated: action.receivedAt
            })
        case SET_INPUT_KEY:
            return Object.assign({}, state, {
                key: action.payload.key
            })
        case GET_INPUT_KEY:
            return Object.assign({}, state, {
                key: action.payload.key
            })
        case ADD_TO_CART:
            return Object.assign({}, state, {
               historyIndex: action.payload.historyIndex,
               cartItems: action.payload.cartItems
            })
        case CLEAR_CART:
            return Object.assign({}, state, {
                action: "Clear Cart"
            })
        default:
            return state
    }
    return state;
}

export default searchInterfaceApp





