import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';
import { createUserSuccess, loadUsersSuccess } from '../../actions/user/user.actions';


export const userFeatureKey = 'user';

export interface State {
  users: User[]
}

export const initialState: State = {
  users: [],
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
);

