import { createAction, props } from '@ngrx/store';
import { Cart } from '../../../../../../shared/models/cart.model';
import { Product } from './../../../../../../shared/models/products.model';

export const loadCart = createAction(
  '[Cart] Load Cart'
);

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ data: Cart }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error:Error }>()
);
export const updateCart = createAction(
  '[Cart] Update Cart',
  props<{ data: Product }>()
);

export const updateCartSuccess = createAction(
  '[Cart] Update Cart Success',
  props<{ data: Cart}>()
);

export const updateCartFailure = createAction(
  '[Cart] Update Cart Failure',
  props<{ error: Error }>()
);
export const updateReduceCart = createAction(
  '[Cart] Update Reduce Cart',
  props<{ data: Product }>()
);

export const updateReduceCartSuccess = createAction(
  '[Cart] Update Reduce Cart Success',
  props<{ data: Cart}>()
);

export const updateReduceCartFailure = createAction(
  '[Cart] Update Reduce Cart Failure',
  props<{ error: Error }>()
);
export const deleteFromCart = createAction(
  '[Cart] Delete Product From Cart',
  props<{data: Product}>()
);

export const deleteFromCartSuccess = createAction(
  '[Cart] Delete Product  From Cart Success',
  props<{ data: Cart }>()
);

export const deleteFromCartFailure = createAction(
  '[Cart] Delete Product  From Cart Failure',
  props<{ error: Error }>()
);




