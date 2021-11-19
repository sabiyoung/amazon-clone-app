import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';
import { createUserSuccess, loadUsersSuccess, loginUserSuccess, logoutUserSuccess } from '../../actions/user/user.actions';


export const userFeatureKey = 'user';

export interface State {
  users: User[]
  loggedInUser: User | null
}

export const initialState: State = {
  users: [],
  loggedInUser: JSON.parse(localStorage.getItem('token') || '{}')
};


export const reducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, action) => {
    return { ...state, users: action.data };
  }),
  on(createUserSuccess, (state, action) => {
    const users = [...state.users];
    users.push(action.data);
    return { ...state, users };
  }),


on(loginUserSuccess, (state, action) => {
  localStorage.setItem('token', JSON.stringify(action.data))

  return { ...state, loggedInUser: action.data };
}),
on(logoutUserSuccess, (state, action) => {
  return { ...state, loggedInUser: null};
}),
)
