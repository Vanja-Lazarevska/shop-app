import { ActionReducerMap } from "@ngrx/store";
import { productsReducer, ProductsState } from "./products/products.reducers";


export interface AppState {
    sortedOrFilteredProducts: ProductsState
}

export const AppReducer: ActionReducerMap<AppState> = {
    sortedOrFilteredProducts: productsReducer
}

