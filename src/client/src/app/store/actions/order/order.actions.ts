import { createAction, props } from '@ngrx/store';
import { Cart } from '../../../../../../shared/models/cart.model';
import { Order } from '../../../../../../shared/models/order.model';
import { Product } from '../../../../../../shared/models/products.model';

export const loadOrder = createAction(
  '[Order] Load Orders'
);

export const loadOrderSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ data: Order}>()
);

export const loadOrderFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: any }>()
);

export const updateOrder = createAction(
  '[Order] Update Order',
  props<{ data: Cart}>()
);

export const updateOrderSuccess = createAction(
  '[Order] Update Order Success',
  props<{ data: Order}>()
);
export const updateOrderFailure = createAction(
  '[Order] Update Order Failure',
  props<{ error: Error }>()
);
