import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './../../index';
import * as fromProduct from '../../reducers/product/product.reducer'

const productsFeatureSelector = createFeatureSelector<AppState, fromProduct.State>(fromProduct.productFeatureKey)

export const productsSelector = createSelector(
  productsFeatureSelector,
  (state) => state.products
);
export const selectedProductSelector = createSelector(
  productsFeatureSelector,
  (state) => state.selectedProduct
)
export const addToCartSelector = createSelector(
  productsFeatureSelector,
  (state) => state.cart
)
export const cartSelector = createSelector(
  productsFeatureSelector,
  (state) => state.cart
)

export const ratingSelector = createSelector(
  productsFeatureSelector,
  (state) => state.rating
)
