import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCurrency } from '../models/user-currency.model';

@Injectable({
  providedIn: 'root',
})
export class UserIpInfoService {
  private apiIp: string = environment.ipUserUrl;
  constructor(private http: HttpClient) {}

  getUserCurrency(): Observable<UserCurrency> {
    return this.http.get<UserCurrency>(this.apiIp);
  }
}
