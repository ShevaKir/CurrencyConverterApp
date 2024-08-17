import { environment } from '../environments/environment';
import { ConversionResult } from '../models/conversion-result';
import { CurrencyCode } from '../models/currency-code.model';
import { CurrentRate } from '../models/current-rate.model';
import { UserCurrency } from '../models/user-currency.model';

export interface CurrencyState {
  currentRate: CurrentRate | null;
  userCurrency: UserCurrency | null;
  supportedCurrencyCodes: CurrencyCode[] | null;
  conversionResult: ConversionResult;
}

export const initialState: CurrencyState = {
  currentRate: null,
  userCurrency: null,
  supportedCurrencyCodes: null,
  conversionResult: {
    conversion_result: 0,
    base_code: environment.defaultBaseCurrency,
    target_code: environment.defaultTargetCurrency,
    conversion_rate: 0,
    amount: 0,
  },
};
