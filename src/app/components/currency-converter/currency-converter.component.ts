import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InputCurrencyComponent } from '../input-currency/input-currency.component';
import { Store } from '@ngrx/store';
import {
  selectBaseConversionResult,
  selectSupportedCurrencyCodes,
  selectTargetConversionResult,
} from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { loadConversionResult, updateBaseAmount } from '../../store/actions';
import { CurrencyAmount } from '../../models/currency-amount.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [MatCardModule, InputCurrencyComponent, AsyncPipe],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  public baseAmount: number = 0;
  public selectedBaseCurrencyAmount$ = this.store.select(
    selectBaseConversionResult
  );
  public selectedTargerCurrencyAmount$ = this.store.select(
    selectTargetConversionResult
  );

  public selectedSupportedCurrency$ = this.store.select(
    selectSupportedCurrencyCodes
  );

  private baseCurrencyAmount!: CurrencyAmount;
  private targetCurrencyAmount!: CurrencyAmount;

  constructor(private store: Store) {
    this.store.dispatch(
      loadConversionResult({
        base: environment.defaultBaseCurrency,
        target: environment.defaultTargetCurrency,
        amount: 10,
      })
    );
  }

  handleBaseAmount(amount: number) {
    this.baseCurrencyAmount = {
      ...this.baseCurrencyAmount,
      amount,
    };
  }

  handleBaseCurrency(currency: string) {
    debugger;
    this.baseCurrencyAmount = {
      ...this.baseCurrencyAmount,
      currency,
    };
    this.dispatchConversion();
  }

  handleTargetAmount(amount: number) {
    this.targetCurrencyAmount = {
      ...this.targetCurrencyAmount,
      amount,
    };
  }

  handleTargetCurrency(currency: string) {
    this.targetCurrencyAmount = {
      ...this.targetCurrencyAmount,
      currency,
    };
    this.dispatchConversion();
  }

  private dispatchConversion(): void {
    if (
      this.baseCurrencyAmount?.amount &&
      this.baseCurrencyAmount?.currency &&
      this.targetCurrencyAmount?.currency
    ) {
      this.store.dispatch(
        loadConversionResult({
          base: this.baseCurrencyAmount.currency,
          target: this.targetCurrencyAmount.currency,
          amount: this.baseCurrencyAmount.amount,
        })
      );
    }
  }
}
