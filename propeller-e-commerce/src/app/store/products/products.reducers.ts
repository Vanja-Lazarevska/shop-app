import { createReducer, on } from "@ngrx/store";
import {  filteredProductsValue, sortedProductsValue } from "./products.actions";


export interface ProductsState {
    sortedProductsValue: string,
    filteredProductsValue: string
}

export const initialState: ProductsState = {
    sortedProductsValue: '',
    filteredProductsValue: '',
}

export const productsReducer = createReducer(initialState, 
    on(sortedProductsValue, (state, payload) => {
        return {
         ...state,
         sortedProductsValue: payload.sortedProductValue
        }
    }),
    on(filteredProductsValue, (state, payload) => {
        return {
            ...state,
            filteredProductsValue: payload.filteredProductValue
        }
    }))