import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure, createUser, createUserSuccess, createUserFailure, loginUser, loginUserFailure, loginUserSuccess, loginNavigateSuccess, logoutUserSuccess, logoutUser, logoutUserFailure } from '../../actions/user/user.actions';




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
// updateUsers$ = createEffect(() =>
// this.actions$.pipe(
//   ofType(updateUser),
//   mergeMap((action) =>
//     this.userService.updateUser(action.data).pipe(
//       map((data) => updateUserSuccess({ data })),
//       catchError((error) => of(updateUserFailure({ error })))
//     )
//   )
// )
// );

constructor(
  private actions$: Actions,
  private userService: UserService
) {}
}



