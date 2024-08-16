import { createAction, props } from '@ngrx/store';
import { CurrentRate } from '../models/current-rate.model';
import { ExchangeRateErrorResponse } from '../models/exchange-rate-error-response.model';
import { UserCurrency } from '../models/user-currency.model';

export const loadCurrentRate = createAction(
  '[Current Rate] Load Current Rate',
  props<{ base: string; target: string }>()
);

export const loadCurrentRateSuccess = createAction(
  '[Current Rate] Load Current Rate Success',
  props<{ currentRate: CurrentRate | null }>()
);

export const loadCurrentRateFailure = createAction(
  '[Current Rate] Load Current Rate Failure',
  props<{ error: ExchangeRateErrorResponse }>()
);

export const loadUserCurrency = createAction(
  '[User Currency] Load User Currency'
);

export const loadUserCurrencySuccess = createAction(
  '[User Currency] Load User Currency Success',
  props<{ userCurrency: UserCurrency | null }>()
);

export const loadUserCurrencyFailure = createAction(
  '[User Currency] Load User Currency Failure',
  props<{ error: any }>()
);
