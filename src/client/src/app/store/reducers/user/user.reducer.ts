import { Action, createReducer, on } from '@ngrx/store';
import { Adress } from '../../../../../../shared/models/adress.model';
import { User } from '../../../../../../shared/models/user.model';
import { createAdressSuccess, createUserSuccess, loadAdressSuccess, loadUsersSuccess, loginUserSuccess, logoutUserSuccess } from '../../actions/user/user.actions';


export const userFeatureKey = 'user';

export interface State {
  users: User[];
  loggedInUser: User | null;
  adress:Adress[];
}

export const initialState: State = {
  users: [],
  loggedInUser: JSON.parse(localStorage.getItem('token') || '{}'), 
  adress:[]
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

  on(loadAdressSuccess, (state, action) => {
    return { ...state, adress: action.data };
  }),
  on(createAdressSuccess, (state, action) => {
    const adress = [...state.adress];
    adress.push(action.data);
    return { ...state, adress };
  }),
on(loginUserSuccess, (state, action) => {
  localStorage.setItem('token', JSON.stringify(action.data))
  return { ...state, loggedInUser: action.data };
}),
on(logoutUserSuccess, (state, action) => {
  localStorage.removeItem('token')
  return { ...state, loggedInUser: null};
}),
)
