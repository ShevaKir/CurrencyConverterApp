import { createAction, props } from '@ngrx/store';
import { CurrentRate } from '../models/current-rate.model';
import { ExchangeRateErrorResponse } from '../models/exchange-rate-error-response.model';
import { UserCurrency } from '../models/user-currency.model';
import { CurrencyCode } from '../models/currency-code.model';
import { ConversionResult } from '../models/conversion-result';

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

export const loadSupportedCurrencyCodes = createAction(
  '[Supported Currency Codes] Load Supported Currency Codes'
);

export const loadSupportedCurrencyCodesSuccess = createAction(
  '[Supported Currency Codes] Load Supported Currency Codes Success',
  props<{ supportedCurrencyCodes: CurrencyCode[] | null }>()
);

export const loadSupportedCurrencyCodesFailure = createAction(
  '[Supported Currency Codes] Load Supported Currency Codes Failure',
  props<{ error: ExchangeRateErrorResponse }>()
);

export const loadConversionResult = createAction(
  '[Conversion Result] Conversion Result',
  props<{ base: string; target: string; amount: number }>()
);

export const loadConversionResultSuccess = createAction(
  '[Conversion Result] Load Conversion Result Success',
  props<{ conversionResult: ConversionResult }>()
);

export const loadConversionResultFailure = createAction(
  '[Conversion Result] Load Conversion Result Failure',
  props<{ error: ExchangeRateErrorResponse }>()
);
