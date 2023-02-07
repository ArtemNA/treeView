import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AccountState, accountStateKey } from '../reducers/account.reducers';

const accountSelector = createFeatureSelector<AccountState>(accountStateKey);

export namespace AccountSelectors {

  export const selectAccountsList = createSelector(accountSelector, state => state.accountsList);
}
