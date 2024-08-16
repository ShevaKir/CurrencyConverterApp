import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CurrencyActions from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { CurrencyService } from '../services/currency.service';

@Injectable()
export class CurrencyEffects {
  constructor(
    private currencyService: CurrencyService,
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
}
