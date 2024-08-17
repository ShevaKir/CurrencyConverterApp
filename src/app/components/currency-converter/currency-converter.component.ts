import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InputCurrencyComponent } from '../input-currency/input-currency.component';
import { Store } from '@ngrx/store';
import {
  selectSupportedCurrencyCodes,
} from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { CurrencyAmount } from '../../models/currency-amount.model';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [MatCardModule, InputCurrencyComponent, AsyncPipe],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  public selectedSupportedCurrency$ = this.store.select(
    selectSupportedCurrencyCodes
  );

  constructor(private store: Store) {}
}
