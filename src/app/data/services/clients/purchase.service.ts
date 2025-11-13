import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Purchase } from '@data/interfaces/create-purchase';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { TokenService } from '../utils/token.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private readonly _http = inject(HttpClient);
  private readonly _tokenService= inject(TokenService);
  private readonly API_URL = environment.apiUrl;

  createPurchase(purchase:Purchase): Observable<any> {
    return this._http.post<any>(`${this.API_URL}/purchase/create`, purchase);
  }
}
