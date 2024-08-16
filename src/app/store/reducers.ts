import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as CurrencyActions from './actions';
import { environment } from '../environments/environment';

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
  }),
  on(CurrencyActions.loadUserCurrencySuccess, (state, { userCurrency }) => {
    return {
      ...state,
      userCurrency: userCurrency,
    };
  }),
  on(CurrencyActions.loadUserCurrencyFailure, (state, { error }) => {
    return {
      ...state,
      userCurrency: null,
      error: error,
    };
  })
);
