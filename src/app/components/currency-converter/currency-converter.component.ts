import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InputCurrencyComponent } from '../input-currency/input-currency.component';
import { Store } from '@ngrx/store';
import {
  selectConversionResult,
  selectSupportedCurrencyCodes,
} from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { loadConversionResult } from '../../store/actions';
import { environment } from '../../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { ConversionResult } from '../../models/conversion-result';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    InputCurrencyComponent,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private conversionResult: ConversionResult | undefined;

  public selectedConversionResult$ = this.store.select(selectConversionResult);
  public selectedSupportedCurrency$ = this.store.select(
    selectSupportedCurrencyCodes
  );

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store) {
    this.form = new FormGroup({
      amountBase: new FormControl(null, [Validators.min(0)]),
      currencyBase: new FormControl(null),
      amountTarget: new FormControl(null, [Validators.min(0)]),
      currencyTarget: new FormControl(null),
    });

    this.store.dispatch(
      loadConversionResult({
        base: environment.defaultBaseCurrency,
        target: environment.defaultTargetCurrency,
        amount: 10,
      })
    );

    this.selectedConversionResult$.subscribe((result) => {
      this.conversionResult = result;
    });
  }

  ngOnInit(): void {
    const selectedConversionResultSub =
      this.selectedConversionResult$.subscribe((result) => {
        if (result) {
          this.conversionResult = result;

          this.form.patchValue({
            amountBase: parseFloat(this.conversionResult.amount.toFixed(2)),
            currencyBase: this.conversionResult.base_code,

            currencyTarget: this.conversionResult.target_code,
          });

          this.form.patchValue(
            {
              amountTarget: parseFloat(
                this.conversionResult.conversion_result.toFixed(2)
              ),
            },
            { emitEvent: false }
          );
        }
      });

    const amountBaseChangesSub = this.form.controls['amountBase'].valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((value) => {
        if (this.form.controls['amountBase'].valid) {
          this.dispatchConversion();
        }
      });

    const currencyBaseChangesSub = this.form.controls[
      'currencyBase'
    ].valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((value) => {
        if (this.form.controls['currencyBase'].valid) {
          this.dispatchConversion();
        }
      });

    const amountTargetChangesSub = this.form.controls[
      'amountTarget'
    ].valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((value) => {
        if (
          this.form.controls['amountTarget'].valid &&
          this.conversionResult?.conversion_rate
        ) {
          this.form.patchValue(
            {
              amountBase: parseFloat(
                (value / this.conversionResult.conversion_rate).toFixed(2)
              ),
            },
            { emitEvent: false }
          );
        }
      });

    const currencyTargetChangesSub = this.form.controls[
      'currencyTarget'
    ].valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((value) => {
        if (this.form.controls['currencyTarget'].valid) {
          this.dispatchConversion();
        }
      });

    this.subscriptions.add(amountBaseChangesSub);
    this.subscriptions.add(currencyBaseChangesSub);
    this.subscriptions.add(amountTargetChangesSub);
    this.subscriptions.add(currencyTargetChangesSub);
    this.subscriptions.add(selectedConversionResultSub);
  }

  private dispatchConversion(): void {
    if (this.conversionResult) {
      this.store.dispatch(
        loadConversionResult({
          base: this.form.controls['currencyBase'].value,
          target: this.form.controls['currencyTarget'].value,
          amount: this.form.controls['amountBase'].value,
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
