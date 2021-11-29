import { Action, createReducer, on } from '@ngrx/store';
import { Cart } from '../../../../../../shared/models/cart.model';
import { Product } from '../../../../../../shared/models/products.model';
import { logoutUserSuccess } from '../../actions/user/user.actions';
import { deleteFromCartSuccess,  loadCartSuccess, updateCartSuccess, updateReduceCartSuccess } from './../../actions/cart/cart.actions';


export const cartFeatureKey = 'cart';

export interface State {
cart:Cart | null;
}

export const initialState: State = {
cart: null,
};


export const reducer = createReducer(
  initialState,
  on(loadCartSuccess, (state, action) => {
    return { ...state, cart: action.data };
  }),

  on(updateCartSuccess, (state, action) => {
    return { ...state, cart:action.data};
  }),

  on(updateReduceCartSuccess, (state, action) => {
    return { ...state, cart:action.data};
  }),
  on(deleteFromCartSuccess, (state, action) => {
    return {
      ...state, cart: action.data
    };
  }),

  on(logoutUserSuccess, (state, action) => {
    return { ...state, cart: null};
  }),




 );

