import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrlUser}`;

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this._http.post<any>(`${this.API_URL}/auth/login`, body);
  }

  register(
    name: string,
    lastname: string,
    email: string,
    password: string,
    phone: string
  ): Observable<any> {
    const body = { name, lastname, email, password, phone};
    return this._http.post<any>(`${this.API_URL}/auth/signup`, body);
  }
}
