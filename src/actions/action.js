/*
 * action types
 */
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const SET_INPUT_KEY = 'SET_INPUT_KEY'
export const GET_INPUT_KEY = 'GET_INPUT_KEY'
export const FETCH_PRODUCT = 'FETCH_PRODUCT';

let inputKeys = [];

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

export function getInputKey(){
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


