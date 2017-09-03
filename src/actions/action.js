/*
 * action types
 */
import * as _ from 'underscore';

export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const SET_INPUT_KEY = 'SET_INPUT_KEY'
export const GET_INPUT_KEY = 'GET_INPUT_KEY'
export const FETCH_PRODUCT = 'FETCH_PRODUCT'
export const GET_HISTORY = 'GET_HISTORY'
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS'

//actions handled by network requests
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const SAVE_SEARCH_RESUTLS = 'SAVE_SEARCH_RESUTLS'
export const TOGGLE_LOADER = 'TOGGLE_LOADER'


let inputKeys = [];
let history = [
    {
        searchQuery: "",
        searchResults: [],
        cartItems: []
    }
]
let historyIndex = 0;
//this is the action for getting the search results
export function fetchProduct(query = null) {
    return {
        type: FETCH_PRODUCT,
        payload: {
            query: query
        }
    }
}

export function setInputKey(key = null) {
    inputKeys.push(key);
    return {
        type: SET_INPUT_KEY,
        payload: {
            key: key
        }
    }
}

export function getInputKey() {
    let keys = inputKeys[inputKeys.length - 1];
    inputKeys = [];
    return {
        type: GET_INPUT_KEY,
        payload: {
            key: keys
        }
    }
}

export function addToCart(productData) {

    // let newCartItems = history[history.length - 1].cartItems;
    // let duplicateId = _.find(newCartItems, (item) => {
    //     return item.id === productData.id;
    // });
    // if (!duplicateId) {
    //     productData['quantity'] = 1;
    //     newCartItems.push(productData);
    // } else {
    //     _.each(newCartItems, (item, index) => {
    //         if (item.id === productData.id) {
    //             item.quantity++;
    //             newCartItems[index] = item;
    //         }
    //     });
    // }

    let newCartItems = [];

    newCartItems.push(productData);

    history.push({
        searchQuery: history[history.length - 1].searchQuery,
        searchResults: history[history.length - 1].searchResults,
        cartItems: newCartItems
    });

    console.log(history);

    return {
        type: ADD_TO_CART,
        payload: {
            historyIndex: historyIndex,
            cartItems: newCartItems
        }
    }
}

export function clearCart(historyIndex) {
    history[historyIndex].cartItems = [];
    return {
        type: CLEAR_CART
    }
}

//for actions handled by network request
export function requestProducts(product) {
    return {
        type: REQUEST_PRODUCTS,
        search_query: product
    }
}

export function receiveProducts(product, json) {
    return {
        type: RECEIVE_PRODUCTS,
        search_query: product,
        searchResults: json,
        receivedAt: Date.now()
    }
}

export function fetchProducts(search_query) {
    return function (dispatch) {
        dispatch(requestProducts(search_query));
        let data = {};
        return fetch(`http://es.backpackbang.com:9200/products/amazon/_search?q=title:${search_query}`)
            .then(
                (response) => response.json(),
                (error) => console.log('An error occured.', error)
            )
            .then((json) => {
                return json;
                // dispatch(receiveProducts(search_query, json.hits))
            })
    }
}

export function getHistory(index) {
    if (index < 0) {
        index = 0;
    }
    else if (index >= history.length) {
        index = history.length - 1;
    }
    return {
        type: GET_HISTORY,
        payload: {
            history: history[index]
        }
    }
}

export function saveSearchResults(searchQuery, searchResults, cartItems) {
    historyIndex++;
    history.push({
        searchQuery: searchQuery,
        searchResults: searchResults,
        cartItems: []
    });

    console.log(history);

    return {
        type: SAVE_SEARCH_RESUTLS,
        payload: {
            searchResults: searchResults
        }
    }
}

export function getSearchResults() {
    return {
        type: GET_SEARCH_RESULTS,
        payload: {
            searchResults: history[history.length - 1]
        }
    }
}

export function toggleLoader() {
    return {
        type: TOGGLE_LOADER
    }
}









