import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure, createUser, createUserSuccess, createUserFailure } from '../../actions/user/user.actions';



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
constructor(
  private actions$: Actions,
  private userService: UserService
) {}
}
