import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../..';
import * as fromUser from '../../reducers/user/user.reducer'
const userFeatureSelector = createFeatureSelector<AppState, fromUser.State>(fromUser.userFeatureKey)
export const usersSelector = createSelector(
  userFeatureSelector,
  (state) => state.users
)
export const loggedInUserSelector = createSelector(
  userFeatureSelector,
  (state) =>{
  return state.loggedInUser
}
)
export const adressSelector = createSelector(
  userFeatureSelector,
  (state) => state.adress
)
