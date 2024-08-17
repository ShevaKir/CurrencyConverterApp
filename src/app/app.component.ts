import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { loadSupportedCurrencyCodes, loadUserCurrency } from './store/actions';
import { CurrencyConverterComponent } from "./components/currency-converter/currency-converter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CurrencyConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadUserCurrency());
    this.store.dispatch(loadSupportedCurrencyCodes());
  }
}
