import { CurrentRate } from './current-rate.model';

export interface ConversionResult extends CurrentRate {
  conversion_result: number;
  amount: number;
}
