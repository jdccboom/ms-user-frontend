import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { CreateUser } from '@data/interfaces/create-user';
import { AuthService } from '@data/services/clients/auth.service';
import { PopupService } from '@shared/services/popup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  private readonly _authService = inject(AuthService);
  private readonly _popupService = inject(PopupService);
  private readonly _location = inject(Location);

 

  warningName = true;
  warningLastname = true;
  warningPhone = true;
  warningMail = true;
  warningPassword = true;
  isLoading?: boolean;

  validateName: String = "form-control";
  validateLastname: String = "form-control";
  validatePhone: String = "form-control";
  validateMail: String = "form-control";
  validatePassword: String = "form-control";

  inputName(event: any) {
    this.validateName = "form-control";
    this.warningName = true;
  }

  inputLastname(event: any) {
    this.validateLastname = "form-control";
    this.warningLastname = true;
  }

  inputPhone(event: any) {
    this.validatePhone = "form-control";
    this.warningPhone = true;
  }

  inputMail(event: any) {
    this.validateMail = "form-control";
    this.warningMail = true;
  }
  
  inputPassword(event: any) {
    this.validatePassword = "form-control";
    this.warningPassword = true;
  }
  
  cloudinary?: any;
  account: CreateUser;

  constructor() {
    this.account = new CreateUser();
  }


  SingUp(event: any) {
    if (this.account.name == "") {
      this.validateName = this.validateName + " is-invalid"
      this.warningName = false;
    }
    if (this.account.lastname == "") {
      this.validateLastname = this.validateLastname + " is-invalid"
      this.warningLastname = false;
    }
    if (this.account.phone == "") {
      this.validatePhone = this.validatePhone + " is-invalid"
      this.warningPhone = false;
    }
    if (this.account.email == "") {
      this.validateMail = this.validateMail + " is-invalid"
      this.warningMail = false;
    }
    if (this.account.password == "") {
      this.validatePassword = this.validatePassword + " is-invalid"
      this.warningPassword = false;
    }
    if (this.account.name != "" && this.account.phone != "" && this.account.email != "" && this.account.password != "") {
      this._authService.register(this.account.name, this.account.lastname , this.account.email, 
        this.account.password, this.account.phone ).subscribe({
        next: (response) => {
          this._popupService.openSnackBar(response.message);
        },
        error: (err) => {
          this._popupService.openSnackBar(err.message);
        }
      });
    }
  }

  goBack() {
    this.account.email = '';
    this.account.password = '';
    this._location.back(); 
  } 
}
