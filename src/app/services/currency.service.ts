import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { ExchangeRateResponse } from '../models/exchange-rate-response.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private _apiPath = `${environment.apiUrl}/${environment.apiKey}`;
  constructor(private http: HttpClient) {}

  getCurrentRate(
    base: string,
    target: string
  ): Observable<ExchangeRateResponse> {
    return this.http.get<ExchangeRateResponse>(
      `${this._apiPath}/pair/${base.toUpperCase()}/${target.toUpperCase()}`
    );
  }
}
