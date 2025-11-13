import { Component, OnInit, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ViewportScroller } from "@angular/common";
import { PopupService } from "@shared/services/popup.service";
import { StatusService } from "@shared/services/status.service";
import { StatusProps } from "@shared/enums/config";
import { UserFormComponent } from "@modules/client/components/user-form/user-form.component";
import { DeleteUserDialogComponent } from "@modules/client/components/delete-user-dialog/delete-user-dialog.component";
import { UserService } from "@data/services/clients/user.service";
import { User } from "@data/interfaces/user";

@Component({
  selector: "app-users",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UsersComponent implements OnInit {

  private readonly _userService = inject(UserService);
  private readonly _dialog = inject(MatDialog);
  private readonly _popupService = inject(PopupService);
  private readonly _statusService = inject(StatusService);
  private readonly _viewportScroller = inject(ViewportScroller);

  users: User[] = [];
  displayedColumns: string[] = ["id","first_name", "last_name", "email", "country","role", "actions"];
  page: number = 0;
  total_page: number = 0;
  query: string = "";
  filter: string = "firts_name";

  ngOnInit(): void {
    this._statusService.getObservable(StatusProps.USER).subscribe(users => {
      this.users = users || [];
    });

    const storedUsers = this._statusService.get(StatusProps.USER);
    if (storedUsers?.length) {
      this.users = storedUsers;
    } else {
      this.fetchUsers();
    }
  }

  fetchUsers(): void {
    const filters = { genre: this.filter, name: this.query };

    this._userService.searchUsers(this.page, 12, "").subscribe({
      next: (response) => {
        this._statusService.update(StatusProps.USER, response.items);
        this.page = response.page;
        this.total_page = response.total_pages;
      },
      error: (error) => {
        console.error("Error al obtener usuario:", error);
        this._popupService.openSnackBar("Error al obtener las usuario.");
      }
    });
  }

  changePage(page: string) {
    this.page = +page;
    this.fetchUsers();
    this._viewportScroller.scrollToPosition([0, 0]);
  }

  openUserForm(user?: User): void {
    const dialogRef = this._dialog.open(UserFormComponent, {
      width: "500px",
      data: user ? { ...user } : {},
    });

  }

  openDeleteDialog(user: User): void {
    const dialogRef = this._dialog.open(DeleteUserDialogComponent, {
      width: "300px",
      data: user,
    });
  }

}
