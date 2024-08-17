import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, map } from 'rxjs';
import { ExchangeRateResponse } from '../models/exchange-rate-response.model';
import { CurrencyCode } from '../models/currency-code.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private _apiPath = `${environment.apiUrl}/${environment.apiKey}`;
  constructor(private http: HttpClient) {}

  getCurrentRate(
    base: string,
    target: string,
    amount: number = 1
  ): Observable<ExchangeRateResponse> {
    return this.http.get<ExchangeRateResponse>(
      `${
        this._apiPath
      }/pair/${base.toUpperCase()}/${target.toUpperCase()}/${amount}`
    );
  }

  getSupportedCurrencies(): Observable<CurrencyCode[]> {
    return this.http.get<any>(`${this._apiPath}/codes`).pipe(
      map((response) => {
        const supportedCodes: CurrencyCode[] = response.supported_codes.map(
          (item: [string, string]) => ({
            code: item[0],
            name: item[1],
          })
        );

        return supportedCodes;
      })
    );
  }
}
