import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Account } from '../interfaces/model';
import { mockApiData } from '../../mock/mock-api-data';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getAccountsList(): Observable<Account> {
    return this.http.get<Account>('https://71013f65-b118-41be-9b20-f062e0e58598.mock.pstmn.io/accounts')
      .pipe(
        catchError(err => {
          // I got error "Your team plan allows 1000 mock server calls per month. Contact your team Admin to up your limit.", so just continued using the following (data taken 02/06/2023 from same endpoint)
          if (err.status === 429) return of(mockApiData);
          return throwError(() => new Error(err.error?.error?.message ?? err.message));
        })
      );
  }
}
