import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly _router = inject(Router)

  setToken(token: string) {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.setItem("token", token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem("token");
  } 
  
  signUp() {
    window.sessionStorage.clear();
    this._router.navigate([""]);
  }

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.email;
    }
    return "";
  }

  getCodigo(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.id;
    }
    return "";
  }

  getRole(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol;
    }
    return "";
  }

  private decodePayload(token: string): any {
    const payload = token.split(".")[1];
    const payloadDecoded = atob(payload);
    return JSON.parse(payloadDecoded);
  }
  
}
