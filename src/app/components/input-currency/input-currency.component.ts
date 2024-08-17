import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input() amount: number = 0;
  @Input() currency: string = '';
  @Input() supportedCurrencies: CurrencyCode[] | null = [];
  private subscriptions: Subscription = new Subscription();
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      amountInput: new FormControl(this.amount, [Validators.min(0)]),
      currencySelect: new FormControl(this.currency),
    });
  }

  ngOnInit(): void {
    const valueChangesSub = this.form.valueChanges.subscribe((value) => {
      if (this.form.valid) {
        this.onChange();
      }
    });

    this.subscriptions.add(valueChangesSub);
  }

  onChange() {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
