import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrlUser}/user`;

  getUserById(id: number): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/${id}`);
  }

  searchUsers(page: number = 0, size: number = 12, sort?: string): Observable<any> {
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
  
      if (sort) params = params.set('sort', sort);

      return this._http.get<any>(`${this.API_URL}/all`, { params});
  }

  createUser(userData: any): Observable<any> {
    return this._http.post<any>(this.API_URL, userData);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this._http.put<any>(`${this.API_URL}/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete<any>(`${this.API_URL}/${id}`);
  }
}
