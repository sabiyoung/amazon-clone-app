import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { deleteFromCart, deleteFromCartFailure, deleteFromCartSuccess,  loadCart, loadCartFailure, loadCartSuccess, updateCart, updateCartFailure, updateCartSuccess, updateReduceCart, updateReduceCartFailure, updateReduceCartSuccess, } from '../../actions/cart/cart.actions';
import { loginUserSuccess } from '../../actions/user/user.actions';
import { Cart } from './../../../../../../shared/models/cart.model';
import { Product } from './../../../../../../shared/models/products.model';




@Injectable()
export class CartEffects {
  loadCart$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadCart),
    mergeMap(() =>
      this.cartService.getCart().pipe(
        map((data) => loadCartSuccess({data})),
        catchError((error) => of(loadCartFailure({ error })))
      )
    )
  )
  );

  loadCartOnSignIn$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginUserSuccess),
    mergeMap(() =>
      this.cartService.getCart().pipe(
        map((data) => loadCartSuccess({data})),
        catchError((error) => of(loadCartFailure({ error })))
      )
    )
  )
  );
updateCart$ = createEffect(() =>
this.actions$.pipe(
  ofType(updateCart),
  mergeMap((action) =>
    this.cartService.updateCart(action.data).pipe(
      map((data) =>updateCartSuccess({data})),
      catchError((error) => of(updateCartFailure({ error })))
    )
  )
)
);
updateReduceCart$ = createEffect(() =>
this.actions$.pipe(
  ofType(updateReduceCart),
  mergeMap((action) =>
    this.cartService.updateCartReduce(action.data).pipe(
      tap(data => console.log(data, "reducing the quantity inside effects")),
      map((data) =>updateReduceCartSuccess({data})),
      catchError((error) => of(updateReduceCartFailure({ error })))
    )
  )
)
);
deleteCart$ = createEffect(() =>
this.actions$.pipe(
  ofType(deleteFromCart),
  mergeMap((action) =>
    this.cartService.deleteProductFromCart(action.data).pipe(
      tap(data =>
      console.log(data, "delete from effect")
    ),
      map((data) =>deleteFromCartSuccess({data})),
      catchError((error) => of(deleteFromCartFailure({ error })))
    )
  )
)
);

  constructor(private actions$: Actions, private cartService: CartService) {}

}
