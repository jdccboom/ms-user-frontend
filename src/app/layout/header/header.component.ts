import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@data/services/utils/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  
  private readonly _tokenService = inject(TokenService);
  private readonly _routerService = inject(Router);


  logout() {
    if(this._tokenService.isLogged()){
      window.sessionStorage.removeItem("token");
      this._routerService.navigate(['login']);
    }
  }
  
  isLogin() {
    return this._tokenService.isLogged();
  }

  isAdmin() {
    return this._tokenService.getRole() == "Admin";
  }
}
