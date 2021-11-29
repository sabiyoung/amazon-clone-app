import { createAction, props } from '@ngrx/store';
import { Adress } from '../../../../../../shared/models/adress.model';
import { User } from '../../../../../../shared/models/user.model';

export const loadUsers = createAction(
  '[User] Load Users'
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

export const loadAdress = createAction(
  '[User] Load Adress'
);
export const loadAdressSuccess = createAction(
  '[User] Load  Adress Success',
  props<{ data: Adress[] }>()
);

export const loadAdressFailure = createAction(
  '[User] Load  Adress Failure',
  props<{ error: Error }>()
);

export const createAdress = createAction(
  '[User] Create  Adress',
  props<{data: Adress}>()
);

export const createAdressSuccess = createAction(
  '[User] Creat Adress Success',
  props<{ data: Adress }>()
);

export const createAdressFailure = createAction(
  '[User] Create Adress Failure',
  props<{ error: Error }>()
);
