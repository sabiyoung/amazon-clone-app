import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Order } from '../../../../../shared/models/order.model';
import { ordersSelector } from 'src/app/store/selectors/order/order.selectors';
import { loadOrder } from 'src/app/store/actions/order/order.actions';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
orders$:Observable<Order | null>
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.orders$ = this.store.select(ordersSelector)
   }

  ngOnInit(): void {
  this.store.dispatch(loadOrder())
  }

}
