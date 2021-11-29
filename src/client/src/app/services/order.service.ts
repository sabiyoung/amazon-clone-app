import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Cart } from '../../../../shared/models/cart.model';
import { Order } from '../../../../shared/models/order.model';
import { Product } from '../../../../shared/models/products.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(  private api: ApiService) { }
  getOrders() {
    return this.api.get<{ data: Order[] }>('order').pipe(map((res) => res.data));
  }
updateOrder(cart: Cart) {
    console.log("service create service cart")
    return this.api.post<Order>('create-order',cart);

  }

  // createProduct(product: Product) {
  //   console.log(product)
  //   return this.api
  //     .post<{ data: Product }>('create-product', product)
  //     .pipe(map((res) => res.data));
  // }
}
