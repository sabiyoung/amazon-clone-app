import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './../../index';
import * as fromOrder from '../../reducers/order/order.reducer'

const ordersFeatureSelector = createFeatureSelector<AppState, fromOrder.State>(fromOrder.orderFeatureKey)

export const ordersSelector = createSelector(
 ordersFeatureSelector,
  (state) => state.orders
);
