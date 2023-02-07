import { Action, createReducer, on } from '@ngrx/store';
import { Account } from '../../interfaces/model';
import { AccountActions } from '../actions/account.actions';

export interface AccountState {
  accountsList: Account | null;
}

export const initialState: AccountState = {
  accountsList: null,
};

export function accountReducer(state: AccountState | undefined, action: Action): AccountState {
  return reducer(state, action);
}

export const accountStateKey = 'account';
const reducer = createReducer<AccountState>(
  initialState,
  on(AccountActions.getAccountDataSuccess, (state, { payload }) => ({ ...state, accountsList: payload })),
);
