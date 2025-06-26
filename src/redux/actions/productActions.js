import { FETCH_PRODUCTS, SET_PRODUCTS } from "../types";

export const fetchProducts = () => ({ type: FETCH_PRODUCTS });
export const setProducts = (products) => ({ type: SET_PRODUCTS, payload: products });
