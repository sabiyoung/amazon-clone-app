import { createAction, props } from '@ngrx/store';
import { Product } from '../../../../../../shared/models/products.model';
import { Rating } from '../../../../../../shared/models/rating.model';
import { User } from '../../../../../../shared/models/user.model';

export const loadProducts = createAction(
  '[Product] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ data: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: Error }>()
);
export const createProducts = createAction(
  '[Product] Create Products',
  props<{data: Product}>()
);

export const createProductsSuccess = createAction(
  '[Product] Create Products Success',
  props<{ data: Product }>()
);

export const createProductsFailure = createAction(
  '[Product] Create Products Failure',
  props<{ error: Error }>()
);
export const selectProductAction = createAction(
  '[Product] Select Product',
  props<{ data: Product}>()
);
export const AddToCart = createAction(
  '[Product] Add Product to Cart',
  props<{ data: Product}>()
);
export const updateCartSuccess = createAction(
  '[Product] Update Cart Success',
  props<{ data: Product}>()
);


export const getTotal = createAction(
  '[Product] Get Total',
  props<{data: Product}>()
);

export const getTotalSuccess = createAction(
  '[Product] get Total Success',
  props<{ data: Product }>()
);

export const getTotalFailure = createAction(
  '[Product]get Total Failure',
  props<{ error: Error }>()
);


export const loadRating = createAction(
  '[Product] Load Reating'
);

export const loadRatingSuccess = createAction(
  '[Product] Load Reating Success',
  props<{ data: Rating[] }>()
);

export const loadRatingFailure = createAction(
  '[Product] Load Reating Failure',
  props<{ error: Error }>()
);

export const createRating = createAction(
  '[Product] Create Reating',
  props<{data: Rating}>()
);

export const createRatingSuccess = createAction(
  '[Product] Create Reating success',
  props<{data: Rating}>()
);
export const createRatingFailure = createAction(
  '[Product] Create Reating Failure',
  props<{ error: Error }>()
);
