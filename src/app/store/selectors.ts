import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrencyState } from './state';
import { CurrencyAmount } from '../models/currency-amount.model';

export const selectCurrencyState =
  createFeatureSelector<CurrencyState>('currencyState');

export const selectCurrentRate = createSelector(
  selectCurrencyState,
  (state) => state.currentRate
);

export const selectBaseConversionResult = createSelector(
  selectCurrencyState,
  (state) => {
    const base: CurrencyAmount = {
      amount: state.conversionResult.amount,
      currency: state.conversionResult.base_code,
    };
    return base;
  }
);

export const selectTargetConversionResult = createSelector(
  selectCurrencyState,
  (state) => {
    const target: CurrencyAmount = {
      amount: state.conversionResult.conversion_result,
      currency: state.conversionResult.target_code,
    };
    return target;
  }
);

export const selectUserCurrency = createSelector(
  selectCurrencyState,
  (state) => state.userCurrency
);

export const selectSupportedCurrencyCodes = createSelector(
  selectCurrencyState,
  (state) => state.supportedCurrencyCodes
);
