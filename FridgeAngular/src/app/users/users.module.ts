import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutModule } from '../layout/layout.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditUserComponent } from './edit-user/edit-user.component';



@NgModule({
  declarations: [
    ListUsersComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    LayoutModule
  ]
})
export class UsersModule { }
