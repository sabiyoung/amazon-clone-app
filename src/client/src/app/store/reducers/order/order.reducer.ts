import { Action, createReducer, on } from '@ngrx/store';
import { updateOrderSuccess, loadOrderSuccess,  } from '../../actions/order/order.actions';
import { Order } from './../../../../../../shared/models/order.model';

export const orderFeatureKey = 'order';

export interface State {
orders:Order | null
}

export const initialState: State = {
orders: null
};


export const reducer = createReducer(
  initialState,
  on(loadOrderSuccess, (state, action) => {
    return { ...state, orders: action.data };
  }),
  on(updateOrderSuccess, (state, action) => {
    return { ...state, orders:action.data};
  }),
);

