import { createAction } from "@ngrx/store"
import { props } from "@ngrx/store"

export const sortedProductsValue = createAction('[Products] Sorted Products',
 props<{sortedProductValue: string}>())
 
export const filteredProductsValue = createAction('[Products] Filter Products',
 props<{filteredProductValue: string}>())


