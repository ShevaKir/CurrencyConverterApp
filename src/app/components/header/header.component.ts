import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private currencyService: CurrencyService) {
    this.currencyService
      .getCurrentRate('USD', 'UAH')
      .subscribe((resulte) => console.log(resulte));
  }
}
