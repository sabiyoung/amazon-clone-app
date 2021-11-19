import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import {Cart } from '../../../../shared/models/cart.model';
import { Product } from '../../../../shared/models/products.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private api: ApiService
  ) { }
  updateCart(product: Product) {
    console.log("service update cart")
    return this.api.put<Cart>('update-cart',product);

  }
  updateCartReduce(product: Product) {
    console.log("service reducing cart", product)
    return this.api.put<Cart>('remove-cart-item',product);

  }
  getCart() {
    return this.api.get<{ data: Cart }>('cart').pipe(map((res) => res.data));
  }

deleteProductFromCart(product: Product) {
  console.log('delete cart from cart', product)
  return this.api.put<Cart>('delete-from-cart/' +  product._id, product)
}
incrementQty(product: Cart) {
  return this.api.put<{data:Cart}>('increment-quantity/' + product._id, product );
}
decrementQty(product:Cart) {
  return this.api.put<Cart>('decrement-quantity/' + product._id, product);
}
}
