import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure, createUser, createUserSuccess, createUserFailure, loginUser, loginUserFailure, loginUserSuccess, loginNavigateSuccess, logoutUserSuccess, logoutUser, logoutUserFailure, loadAdress, loadAdressSuccess, loadAdressFailure, createAdress, createAdressSuccess, createAdressFailure } from '../../actions/user/user.actions';




@Injectable()
export class UserEffects {

loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((data) => loadUsersSuccess({ data })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );
  createUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(createUser),
    mergeMap((action) =>
      this.userService.createUser(action.data).pipe(
        map((data) => createUserSuccess({ data })),
        catchError((error) => of(createUserFailure({ error })))
      )
    )
  )
);
loginUsers$ = createEffect(() =>
this.actions$.pipe(
  ofType(loginUser),
  mergeMap((action) =>
    this.userService.login(action.data).pipe(
      map((data) => loginUserSuccess(data)),
      catchError((error) => of(loginUserFailure({ error })))
    )
  )
)
);
loginSuccess$ = createEffect(() =>
this.actions$.pipe(
  ofType(loginUserSuccess),
  mergeMap((action) =>
    this.userService.loginNavigate().pipe(
      map( () => loginNavigateSuccess())
    )
  )
)
);
logoutUsers$ = createEffect(() =>
this.actions$.pipe(
  ofType(logoutUser),
  mergeMap((action) =>
    this.userService.logout().pipe(
      map((data) => logoutUserSuccess()),
      catchError((error) => of(logoutUserFailure()))
    )
  )
)
);

loadAdress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAdress),
      mergeMap(() =>
        this.userService.getAdress().pipe(
          map((data) => loadAdressSuccess({ data })),
          catchError((error) => of(loadAdressFailure({ error })))
        )
      )
    )
  );
  createAdress$ = createEffect(() =>
  this.actions$.pipe(
    ofType(createAdress),
    mergeMap((action) =>
      this.userService.createAdress(action.data).pipe(
        map((data) => createAdressSuccess({ data })),
        catchError((error) => of(createAdressFailure({ error })))
      )
    )
  )
);

constructor(
  private actions$: Actions,
  private userService: UserService
) {}
}



