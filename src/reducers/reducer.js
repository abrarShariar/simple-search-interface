import {
    SEARCH_PRODUCT,
    ADD_TO_CART,
    CLEAR_CART,
    SET_INPUT_KEY,
    GET_INPUT_KEY,
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS,
    GET_HISTORY
} from '../actions/action';

//defining initial state
// const initialState = {
//     search_text: "",
//     search_results: [],
//     cart_items: []
// }

let historyIndex = 0;
const initialState = {
    index: 0,
    query: "",
    isFetching: false,
    searchResults: [],
    cartItems: []
}


let history = [];

function searchInterfaceApp(state = initialState, action) {

    switch (action.type) {

        case GET_HISTORY:
            return history

        case REQUEST_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: true
            })

        case RECEIVE_PRODUCTS:
            history.push({
                searchQuery: action.search_query,
                searchResults: action.searchResults,
                lastUpdated: action.receivedAt
            });

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
                cartItems: [
                    ...state.cartItems,
                    {
                        text: action.text
                    }
                ]
            })
        case CLEAR_CART:
            return Object.assign({}, state, {
                cartItems: [
                    ...state.cartItems,
                    {
                        text: action.text
                    }
                ]
            })
        default:
            return state
    }
    return state;
}

export default searchInterfaceApp





