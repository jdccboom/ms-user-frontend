import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/user-management/users.component';
import { RolesGuard } from '@data/services/guards/roles.service';

const routes: Routes = [
  {
    path: 'user-management', component: UsersComponent, //canActivate:
    //   [RolesGuard], data: { expectedRole: ["Admin"] }
  },
  { path: '**', redirectTo: 'user-management', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
