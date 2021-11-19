import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../../shared/models/products.model';
import { AddToCart, createProductsSuccess, loadProductsSuccess, selectProductAction,  } from '../../actions/product/product.actions';
import { getTotal } from './../../actions/product/product.actions';


export const productFeatureKey = 'product';

export interface State {
products: Product[];
selectedProduct: Product[]
cart: Product[]
quantity: number
}

export const initialState: State = {
products: [],
selectedProduct: [],
cart: [],
quantity: 1
};


export const reducer = createReducer(
  initialState,
on(loadProductsSuccess, (state, action) => {
  return {...state, products: action.data}
}),
on(createProductsSuccess, (state, action) => {
  const products = [...state.products];
  products.push(action.data);
  return {...state, products}
}),
on(selectProductAction, (state, action) => {
  const selectedProduct = [...state.selectedProduct];
  selectedProduct.push(action.data)
  return { ...state, selectedProduct };
}),
on(AddToCart, (state, action) => {
  const cart = [...state.cart];
cart.push(action.data)
  return { ...state, cart};
}),



);

