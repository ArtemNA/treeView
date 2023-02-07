import { createAction, props } from '@ngrx/store';

import { Account } from '../../interfaces/model';

const stateType = 'Account';

export namespace AccountActions {

  export const getAccountData = createAction(`[${stateType}] Get Account Data`);
  export const getAccountDataSuccess = createAction(`[${stateType}] Get Account Data Success`, props<{ payload: Account }>());
  export const getAccountDataFailure = createAction(`[${stateType}] Get Account Data Failure`);

}
