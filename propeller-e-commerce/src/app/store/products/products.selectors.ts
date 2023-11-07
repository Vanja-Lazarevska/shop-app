import { AppState } from "../app.state";


export const selectSortedProductsValue = (state: AppState) => 
state.sortedOrFilteredProducts.sortedProductsValue

export const selectFilteredProductsValue = (state: AppState) => 
state.sortedOrFilteredProducts.filteredProductsValue
