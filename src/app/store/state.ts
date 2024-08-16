import { CurrencyCode } from '../models/currency-code.model';
import { CurrentRate } from '../models/current-rate.model';
import { UserCurrency } from '../models/user-currency.model';

export interface CurrencyState {
  currentRate: CurrentRate | null;
  userCurrency: UserCurrency | null;
  supportedCurrencyCodes: CurrencyCode[] | null;
}

export const initialState: CurrencyState = {
  currentRate: null,
  userCurrency: null,
  supportedCurrencyCodes: null,
};
