
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './../../index';
import * as fromCart from '../../reducers/cart/cart.reducer'

const cartsFeatureSelector = createFeatureSelector<AppState, fromCart.State>(fromCart.cartFeatureKey)
export const cartSelector = createSelector(
  cartsFeatureSelector,
  (state) => state.cart
)


