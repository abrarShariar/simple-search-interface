/*
 * action types
 */

export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const ADD_TO_CART = 'ADD_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'

export function searchProduct(text) {
    return {type: SEARCH_PRODUCT, text}
}

export function addToCart(productId){
    return {type: ADD_TO_CART, productId}
}

export function clearCart(productId){
    return {type: CLEAR_CART, productId}
}


