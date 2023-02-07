import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { AccountActions } from '../actions/account.actions';
import { Account } from '../../interfaces/model';

@Injectable()
export class AccountEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {}

  getAccountData$ = createEffect(() => this.actions$.pipe(
    ofType(AccountActions.getAccountData),
    switchMap(() => this.apiService.getAccountsList()),
    map((payload: Account) => AccountActions.getAccountDataSuccess({ payload })),
    catchError(() => of(AccountActions.getAccountDataFailure()))
  ));
}
