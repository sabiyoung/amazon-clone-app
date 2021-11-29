import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromProduct from './reducers/product/product.reducer';
import * as fromUser from './reducers/user/user.reducer';
import * as fromCart from './reducers/cart/cart.reducer';
import * as fromOrder from './reducers/order/order.reducer';



export interface AppState {

  [fromProduct.productFeatureKey]: fromProduct.State;
  [fromUser.userFeatureKey]: fromUser.State;
  [fromCart.cartFeatureKey]: fromCart.State;
  [fromOrder.orderFeatureKey]: fromOrder.State;

}

export const reducers: ActionReducerMap<AppState> = {


  [fromProduct.productFeatureKey]: fromProduct.reducer,
  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromCart.cartFeatureKey]: fromCart.reducer,
  [fromOrder.orderFeatureKey]: fromOrder.reducer,

};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
