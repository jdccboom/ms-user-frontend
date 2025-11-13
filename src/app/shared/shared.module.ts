import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { usersInterceptor } from '@data/services/interceptor/users.interceptor';

@NgModule({
   imports: [
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      CommonModule,
      MatSnackBarModule,
      MatFormFieldModule,
      MatTableModule,
      MatButtonModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatCheckboxModule,
      MatDialogModule,
      MatIconModule,
   ],
   providers: [provideHttpClient(withInterceptors([usersInterceptor]))],
   declarations: [AlertDialogComponent, PaginationComponent],
   exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      MatSnackBarModule,
      MatFormFieldModule,
      MatTableModule,
      MatButtonModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatCheckboxModule,
      MatDialogModule,
      MatIconModule,
      AlertDialogComponent,
      PaginationComponent
   ],
})
export class SharedModule { }