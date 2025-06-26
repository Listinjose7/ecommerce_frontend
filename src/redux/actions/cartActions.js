import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART } from "../types";

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, payload: id });
export const updateCartItem = (id, quantity) => ({ type: UPDATE_CART_ITEM, payload: { id, quantity } });
export const clearCart = () => ({ type: CLEAR_CART });
