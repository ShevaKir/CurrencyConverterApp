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
import { loadConversionResult } from '../../store/actions';
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
  public selectedBaseCurrencyAmount$ = this.store.select(
    selectBaseConversionResult
  );
  public selectedTargerCurrencyAmount$ = this.store.select(
    selectTargetConversionResult
  );

  public selectedSupportedCurrency$ = this.store.select(
    selectSupportedCurrencyCodes
  );

  constructor(private store: Store) {
    this.store.dispatch(
      loadConversionResult({
        base: environment.defaultBaseCurrency,
        target: environment.defaultTargetCurrency,
        amount: 10,
      })
    );
  }

  handleBaseCurrencyAmount(event: CurrencyAmount) {
    if (event.amount !== null)
      this.store.dispatch(
        loadConversionResult({
          base: event.currency,
          target: 'UAH',
          amount: event.amount,
        })
      );
  }
}
