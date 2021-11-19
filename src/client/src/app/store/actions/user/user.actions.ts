import { createAction, props } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';

export const loadUsers = createAction(
  '[Product] Load Users'
);
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: Error }>()
);

export const createUser = createAction(
  '[User] Create User',
  props<{data: User}>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ data: User }>()
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: Error }>()
);
export const loginUser = createAction(
  '[User] Login User',
  props<{data: User}>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ data: User }>()
);
export const loginUserFailure = createAction(
  '[User] Login User Failure',
  props<{ error: Error }>()
);
export const loginNavigateSuccess = createAction(
  '[User]  login navivage success',
);
export const logoutUser = createAction(
  '[User] Logout User',
);
export const logoutUserSuccess = createAction(
  '[User] Logout User Success',
);
export const logoutUserFailure = createAction(
  '[User] Logout User Failure',
);
export const logoutNavigateSuccess = createAction(
  '[User]  logout navivage success',
);

// export const updateUser = createAction(
//   '[User] Update User',
//   props<{data: User}>()
// );
// export const updateUserSuccess = createAction(
//   '[User] Update User Success',
//   props<{ data: User }>()
// );

// export const updateUserFailure = createAction(
//   '[User] Update User Failure',
//   props<{ error: Error }>()
// );
