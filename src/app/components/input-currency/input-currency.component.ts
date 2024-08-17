import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyCode } from '../../models/currency-code.model';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { CurrencyAmount } from '../../models/currency-amount.model';

@Component({
  selector: 'app-input-currency',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './input-currency.component.html',
  styleUrl: './input-currency.component.scss',
})
export class InputCurrencyComponent implements OnInit, OnDestroy, OnChanges {
  @Input() currencyAmount: CurrencyAmount | null = {
    amount: 0,
    currency: 'USD',
  };
  @Input() supportedCurrencies: CurrencyCode[] | null = [];
  @Output() selectedAmount = new EventEmitter<number>();
  @Output() selectedCurrency = new EventEmitter<string>();

  private subscriptions: Subscription = new Subscription();
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      amountInput: new FormControl(null, [Validators.min(0)]),
      currencySelect: new FormControl(null),
    });
  }

  ngOnInit(): void {
    const amountChangesSub = this.form.controls['amountInput'].valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((value) => {
        if (this.form.controls['amountInput'].valid) {
          this.onChangeAmount(value);
        }
      });

    const currencyChangesSub = this.form.controls['currencySelect'].valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe((value) => {
        if (this.form.controls['currencySelect'].valid) {
          this.onChangeCurrency(value);
        }
      });

    this.subscriptions.add(amountChangesSub);
    this.subscriptions.add(currencyChangesSub);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currencyAmount']) {
      const prevAmount = changes['currencyAmount'].previousValue;
      const currentAmount = changes['currencyAmount'].currentValue;

      if (
        prevAmount?.amount !== currentAmount?.amount ||
        prevAmount?.currency !== currentAmount?.currency
      ) {
        this.form.patchValue({
          amountInput: currentAmount.amount,
          currencySelect: currentAmount.currency,
        });
      }
    }
  }

  onChangeAmount(amount: number) {
    this.selectedAmount.emit(amount);
  }

  onChangeCurrency(currency: string) {
    this.selectedCurrency.emit(currency);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
