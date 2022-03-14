import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { ErrorPageComponent } from './error-page/error-page.component';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './modules/user/user.module';
import { GroupModule } from './modules/group/group.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from './modules/user/login/login.component';
import { AddUserComponent } from './modules/user/add-user/add-user.component';
import { GroupListComponent } from './modules/group/group-list/group-list.component';

// const routes: Routes = [
//   {
//     path: "", component: GroupListComponent

//   },
//   { path: "login", component: LoginComponent },
//   { path: "addUser", component: AddUserComponent, outlet: "homepage" },
//   {
//     path: "group-list", component: GroupListComponent

//   },
// ]
@NgModule({
  declarations: [
    AppComponent,
   // ErrorPageComponent,
    HomePageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    DialogModule,
    // RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
     GroupModule

  ],
  providers: [],
  bootstrap: [AppComponent]//, ErrorPageComponent]
})
export class AppModule { }
