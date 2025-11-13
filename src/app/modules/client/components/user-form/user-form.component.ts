import { Component, inject, Inject, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { User } from "@data/interfaces/user";
import { UserService } from "@data/services/clients/user.service";
import { PopupService } from "@shared/services/popup.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {

  private readonly _userService = inject(UserService);
  private readonly _popupService = inject(PopupService);

  userForm: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.userForm.patchValue(this.data)
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = {
        ...this.data,
        ...this.userForm.value,
      };
      if (user.id) {
        this._userService.updateUser(user.id, user).subscribe({
          next: () => {
            this.dialogRef.close(user);
            this._popupService.openSnackBar('Usuario actualizada correctamente.');
          },
          error: (error) => {
            this._popupService.openSnackBar('Error al actualizar la película.');
          }
      });
      } else {
        this._userService.createUser(user).subscribe({
          next: () => {
            this.dialogRef.close(user);
            this._popupService.openSnackBar('Usuario agregada correctamente.');
          },
          error: (error) => {
            this._popupService.openSnackBar('Error al agregar la usuario.');
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}

