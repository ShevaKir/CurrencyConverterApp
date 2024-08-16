import { CurrentRate } from '../models/current-rate.model';
import { UserCurrency } from '../models/user-currency.model';

export interface CurrencyState {
  currentRate: CurrentRate | null;
  userCurrency: UserCurrency | null;
}

export const initialState: CurrencyState = {
  currentRate: null,
  userCurrency: null,
};
