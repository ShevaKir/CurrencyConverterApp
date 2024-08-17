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
import { Subscription, distinctUntilChanged } from 'rxjs';
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
  @Output() selectedCurrencyAmount = new EventEmitter<CurrencyAmount>();

  private subscriptions: Subscription = new Subscription();
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      amountInput: new FormControl(null, [Validators.min(0)]),
      currencySelect: new FormControl(null),
    });
  }

  ngOnInit(): void {
    const valueChangesSub = this.form.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (this.form.valid) {
          const selectedCurrencyAmount: CurrencyAmount = {
            amount: this.form.controls['amountInput'].value,
            currency: this.form.controls['currencySelect'].value,
          };
          this.onChange(selectedCurrencyAmount);
        }
      });

    this.subscriptions.add(valueChangesSub);
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

  onChange(currencyAmount: CurrencyAmount) {
    this.selectedCurrencyAmount.emit(currencyAmount);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
