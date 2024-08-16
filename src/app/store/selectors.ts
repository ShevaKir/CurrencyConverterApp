import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrencyState } from './state';

export const selectCurrencyState =
  createFeatureSelector<CurrencyState>('currencyState');
  
export const selectCurrentRate = createSelector(
  selectCurrencyState,
  (state) => state.currentRate
);
