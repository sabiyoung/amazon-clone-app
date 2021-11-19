import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Cart } from '../../../../shared/models/cart.model';
import { Order } from '../../../../shared/models/order.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(  private api: ApiService) { }
  getOrder() {
    return this.api.get<{ data: Order }>('order').pipe(map((res) => res.data));
  }
  updateOrder(product: Cart) {
    console.log("service update cart")
    return this.api.put<Order>('update-order',product);

  }
}
