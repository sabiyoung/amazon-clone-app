import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { loadCartSuccess } from '../../actions/cart/cart.actions';

import {
  createProducts,
  createProductsFailure,
  createProductsSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from '../../actions/product/product.actions';
import { loginUserSuccess } from '../../actions/user/user.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((data) => loadProductsSuccess({ data })),
          catchError((error) => of(loadProductsFailure({ error })))
        )
      )
    )
  );
  createProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProducts),
      mergeMap((action) =>
        this.productService.createProduct(action.data).pipe(
          map((data) => createProductsSuccess({ data })),
          catchError((error) => of(createProductsFailure({ error })))
        )
      )
    )
  );

  // loadSign$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadCartSuccess),
  //     mergeMap(() =>
  //       this.productService.getProducts().pipe(
  //         map((data) => loadProductsSuccess({ data })),
  //         catchError((error) => of(loadProductsFailure({ error })))
  //       )
  //     )
  //   )
  // );
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private userService: UserService
  ) {}
}
