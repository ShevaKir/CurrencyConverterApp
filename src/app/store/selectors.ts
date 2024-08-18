import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrencyState } from './state';

export const selectCurrencyState =
  createFeatureSelector<CurrencyState>('currencyState');

export const selectCurrentRate = createSelector(
  selectCurrencyState,
  (state) => state.currentRate
);
export const selectConversionResult = createSelector(
  selectCurrencyState,
  (state) => {
    return state.conversionResult;
  }
);

export const selectConversionRate = createSelector(
  selectCurrencyState,
  (state) => {
    return state.conversionResult.conversion_rate;
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
