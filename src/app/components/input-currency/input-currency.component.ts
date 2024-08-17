import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
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
import { Subscription } from 'rxjs';
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
export class InputCurrencyComponent implements OnInit, OnDestroy {
  @Input() currencyAmount: CurrencyAmount = { amount: 0, currency: 'USD' };
  @Input() supportedCurrencies: CurrencyCode[] | null = [];
  @Output() selectedCurrencyAmount = new EventEmitter<CurrencyAmount>();

  private subscriptions: Subscription = new Subscription();
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      amountInput: new FormControl(this.currencyAmount.amount, [
        Validators.min(0),
      ]),
      currencySelect: new FormControl(this.currencyAmount.currency),
    });
  }

  ngOnInit(): void {
    const valueChangesSub = this.form.valueChanges.subscribe((value) => {
      if (this.form.valid) {
        const selectedCurrencyAmount: CurrencyAmount = {
          amount: this.form.controls['amountInput'].value,
          currency: this.form.controls['currencySelect'].value,
        };
        this.onChange(selectedCurrencyAmount);
      }
    });

    this.form.patchValue({
      amountInput: this.currencyAmount.amount,
      currencySelect: this.currencyAmount.currency,
    });

    this.subscriptions.add(valueChangesSub);
  }

  onChange(currencyAmount: CurrencyAmount) {
    this.selectedCurrencyAmount.emit(currencyAmount);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
