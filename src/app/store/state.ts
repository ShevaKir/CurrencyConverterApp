import { CurrentRate } from '../models/current-rate.mode';

export interface CurrencyState {
  currentRate: CurrentRate | null;
}

export const initialState: CurrencyState = {
  currentRate: null,
};
