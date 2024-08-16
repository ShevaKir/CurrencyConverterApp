import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { loadCurrentRate } from '../../store/actions';
import { selectCurrentRate } from '../../store/selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public selectedCurrentRate$ = this.store.select(selectCurrentRate);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadCurrentRate({ base: 'USD', target: 'UAH' }));
  }
}
