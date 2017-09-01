/*
 * action types
 */
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


let inputKeys = [];
let history = [];
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

export function addToCart(productId) {
    return {type: ADD_TO_CART, productId}
}

export function clearCart(productId) {
    return {type: CLEAR_CART, productId}
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
    if(index < 0){
        index = 0;
    }
    else if(index >= history.length){
        index = history.length - 1;
    }

    return {
        type: GET_HISTORY,
        payload: {
            searchResults: history[index]
        }
    }
}

export function saveSearchResults(searchQuery, searchResults) {
    historyIndex++;
    history.push(searchResults);
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









