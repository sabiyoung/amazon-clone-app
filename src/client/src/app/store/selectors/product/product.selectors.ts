import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './../../index';
import * as fromProduct from '../../reducers/product/product.reducer'
import * as fromUser from '../../reducers/user/user.reducer'
const productsFeatureSelector = createFeatureSelector<AppState, fromProduct.State>(fromProduct.productFeatureKey)
const userFeatureSelector = createFeatureSelector<AppState, fromUser.State>(fromUser.userFeatureKey)
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
export const usersSelector = createSelector(
  userFeatureSelector,
  (state) => state.users
)
export const quantitySelector = createSelector(
  productsFeatureSelector,
  (state) => state.quantity
)