import {
    SEARCH_PRODUCT,
    ADD_TO_CART,
    CLEAR_CART
} from '../actions/action';

//defining initial state
const initialState = {
    search_text: "",
    search_results: [],
    cart_items: []
}

function searchInterfaceApp(state = initialState, action) {

    switch (action.type) {
        case SEARCH_PRODUCT:
            return Object.assign({}, state, {
                search_text: action.search_text,
                searchResults: action.searchResults
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





