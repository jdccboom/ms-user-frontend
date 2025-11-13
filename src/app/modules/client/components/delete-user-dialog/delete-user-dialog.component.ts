import { Component, Inject } from "@angular/core"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { Movie } from "@data/interfaces/movie"
import { UserService } from "@data/services/clients/user.service";
import { PopupService } from "@shared/services/popup.service";

@Component({
  selector: "app-delete-user-dialog",
  templateUrl: "./delete-user-dialog.component.html",
  styleUrls: ["./delete-user-dialog.component.scss"],
})
export class DeleteUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private userService: UserService,
    private popupService: PopupService
  ) {}

  onConfirm(): void {
    if (this.data.id) {
      this.userService.deleteUser(this.data.id).subscribe({
        next: () => {
          this.popupService.openSnackBar('Usuario eliminado correctamente');
          this.dialogRef.close(true);
        },
        error: () => {
          this.popupService.openSnackBar('Error al eliminar el usuario');
          this.dialogRef.close(false);
        },
      });
    } else {
      this.popupService.openSnackBar('No se pudo eliminar el usuario');
      this.dialogRef.close(false);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

