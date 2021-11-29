import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { loadOrder, loadOrderFailure, loadOrderSuccess, updateOrder, updateOrderFailure, updateOrderSuccess,  } from '../../actions/order/order.actions';



@Injectable()
export class OrderEffects {
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrder),
      mergeMap(() =>
        this.orderService.getOrders().pipe(
        map((data) => loadOrderSuccess({data})),
          catchError((error) => of(loadOrderFailure({ error })))
        )
      )
    )
  );
  updateCart$ = createEffect(() =>
  this.actions$.pipe(
    ofType(updateOrder),
    mergeMap((action) =>
      this.orderService.updateOrder(action.data).pipe(
        map((data) =>updateOrderSuccess({data})),
        catchError((error) => of(updateOrderFailure({ error })))
      )
    )
  )
  );

  constructor(private actions$: Actions, private orderService:OrderService) {}

}
