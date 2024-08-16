import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CurrencyActions from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
import { UserIpInfoService } from '../services/user-ip-info.service';

@Injectable()
export class CurrencyEffects {
  constructor(
    private currencyService: CurrencyService,
    private userIpInfoService: UserIpInfoService,
    private actions$: Actions
  ) {}

  loadCurrentRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.loadCurrentRate),
      switchMap((props) => {
        return this.currencyService
          .getCurrentRate(props.base, props.target)
          .pipe(
            map((rate) =>
              CurrencyActions.loadCurrentRateSuccess({ currentRate: rate })
            ),
            catchError((error) =>
              of(CurrencyActions.loadCurrentRateFailure({ error }))
            )
          );
      })
    )
  );

  loadUserCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.loadUserCurrency),
      switchMap((props) => {
        return this.userIpInfoService.getUserCurrency().pipe(
          map((userCurrency) =>
            CurrencyActions.loadUserCurrencySuccess({
              userCurrency: userCurrency,
            })
          ),
          catchError((error) =>
            of(CurrencyActions.loadUserCurrencyFailure({ error }))
          )
        );
      })
    )
  );
}
