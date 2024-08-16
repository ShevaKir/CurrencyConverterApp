import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { loadCurrentRate } from '../../store/actions';
import { selectCurrentRate } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, AsyncPipe, MatSelectModule, MatFormFieldModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public defaultCurrency = 'USD';
  public selectedCurrentRate$ = this.store.select(selectCurrentRate);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCurrentRate({ base: this.defaultCurrency, target: 'UAH' }));
  }

  onChangePopularCurrency(event: MatSelectChange) {
    this.store.dispatch(loadCurrentRate({ base: event.value, target: 'UAH' }));
  }
}
