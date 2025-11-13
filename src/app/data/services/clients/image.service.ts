import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageDto } from '@data/interfaces/message';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

    private readonly _http = inject(HttpClient);
    private readonly API_URL = `${environment.apiUrl}`;

    constructor() { }

    saveImageCloudinary(image:FormData):Observable<MessageDto>{
      return this._http.post<MessageDto>(this.API_URL+"/image/update",image);
    }

}
