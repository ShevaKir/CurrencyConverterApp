import { createAction, props } from '@ngrx/store';
import { CurrentRate } from '../models/current-rate.mode';
import { ExchangeRateErrorResponse } from '../models/exchange-rate-error-response.model';

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
