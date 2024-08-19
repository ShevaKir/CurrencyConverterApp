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
  }),
  on(
    CurrencyActions.loadConversionResultSuccess,
    (state, { conversionResult }) => {
      return {
        ...state,
        conversionResult: conversionResult,
      };
    }
  ),
  on(CurrencyActions.loadConversionResultFailure, (state, { error }) => {
    return {
      ...state,
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
  }),
  on(
    CurrencyActions.loadSupportedCurrencyCodesSuccess,
    (state, { supportedCurrencyCodes }) => {
      return {
        ...state,
        supportedCurrencyCodes: supportedCurrencyCodes,
      };
    }
  ),
  on(CurrencyActions.loadSupportedCurrencyCodesFailure, (state, { error }) => {
    return {
      ...state,
      supportedCurrencyCodes: null,
      error: error,
    };
  })
);
