import { ActionReducerMap } from '@ngrx/store';
import { accountReducer, AccountState, accountStateKey } from './reducers/account.reducers';

interface AppState {
  [accountStateKey]: AccountState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  [accountStateKey]: accountReducer,
};
