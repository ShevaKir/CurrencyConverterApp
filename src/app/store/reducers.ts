import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as CurrencyActions from './actions';

export const CurrencyReducer = createReducer(
  initialState,
  on(CurrencyActions.loadCurrentRateSuccess, (state, { currentRate }) => {
    return {
      ...state,
      currentRate: currentRate,
    };
  }),
  on(CurrencyActions.loadCurrentRateFailure, (state, { error }) => {
    return {
      ...state,
      currentRate: null,
      error: error,
    };
  })
);
