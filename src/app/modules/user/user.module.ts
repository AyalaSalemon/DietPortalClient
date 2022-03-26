import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { PersonalAreaComponent } from './personal-area/personal-area.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from '../group/group-list/group-list.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "addUser", component: AddUserComponent},//, outlet: "homepage" },
  { path: "group-list", component: GroupListComponent,outlet:"homePageRouter"}//,outlet:'homePageRouter'},
];
@NgModule({
  declarations: [
    AddUserComponent,
    LoginComponent,
    PersonalAreaComponent,

  ],
  imports: [
    CommonModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ],
  providers: [UserService],
  exports: [LoginComponent, PersonalAreaComponent, AddUserComponent]

})
export class UserModule { }
