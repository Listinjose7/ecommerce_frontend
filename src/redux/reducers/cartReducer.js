import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART } from "../types";

const initialState = { cartItems: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const exists = state.cartItems.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    case REMOVE_FROM_CART:
      return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload) };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
}
