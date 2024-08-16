import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { loadCurrentRate } from '../../store/actions';
import { selectCurrentRate, selectUserCurrency } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { UserCurrency } from '../../models/user-currency.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, AsyncPipe, MatSelectModule, MatFormFieldModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public defaultBaseCurrency = environment.defaultBaseCurrency;
  public defaultTargetCurrency = environment.defaultTargetCurrency;
  public selectedCurrentRate$ = this.store.select(selectCurrentRate);
  public userCurrency$: Observable<UserCurrency | null>;

  constructor(private store: Store) {
    this.userCurrency$ = this.store.select(selectUserCurrency);
  }

  ngOnInit(): void {
    this.userCurrency$.subscribe((userCurrency) => {
      this.dispatchLoadCurrentRate(
        this.defaultBaseCurrency,
        userCurrency?.currency
      );
    });
  }

  onChangePopularCurrency(event: MatSelectChange): void {
    this.userCurrency$.subscribe((userCurrency) => {
      this.dispatchLoadCurrentRate(event.value, userCurrency?.currency);
    });
  }

  private dispatchLoadCurrentRate(
    base: string,
    target: string | undefined
  ): void {
    this.store.dispatch(
      loadCurrentRate({ base, target: target ?? this.defaultTargetCurrency })
    );
  }
}
