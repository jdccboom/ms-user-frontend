import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '@data/interfaces/login';
import { AuthService } from '@data/services/clients/auth.service';
import { TokenService } from '@data/services/utils/token.service';
import { PopupService } from '@shared/services/popup.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  private readonly _authentication = inject(AuthService);
  private readonly _tokenService = inject(TokenService)
  private readonly _routes = inject(Router)
  private readonly _popupService = inject(PopupService);

  invalidmail: string = "form-control";
  invalidpass: string = "form-control";
  loginDto!: Login;

  constructor() {
    this.loginDto = new Login()
  }

  ngOnInit(): void {
    if(this._tokenService.isLogged()){
      this._routes.navigate(['/home'])
    }
  }

  errorMessage: string = '';
  token: string = '';

  VerifyPass(event: any) {
    this.invalidpass = "form-control ";
  }

  VerifyMail(event: any) {
    this.invalidmail = "form-control ";
  }

  login() {

    if (this.loginDto?.email == '') {
      this.invalidmail = this.invalidmail + " is-invalid";
    }

    if (this.loginDto?.password == '') {
      this.invalidpass = this.invalidpass + " is-invalid";
    }

    if (this.loginDto?.password != '' && this.loginDto?.email != '') {
      this._authentication.login(this.loginDto?.email, this.loginDto?.password).subscribe({
        next: (response: { token: string; }) => {
          this._tokenService.setToken(response.token);
          this._routes.navigate(['/home'])
        },
        error: (err) => {
          this._popupService.openSnackBar(err.message);
        }
      })
    }
  }

  signup() {
    this.loginDto.email = '';
    this.loginDto.password = '';
    this._routes.navigate(['/signup'])
  }

}
