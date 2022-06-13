import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
//import { ErrorPageComponent } from './error-page/error-page.component';
import { GroupListComponent } from './modules/group/group-list/group-list.component';
import { GroupPortalComponent } from './modules/group/group-portal/group-portal.component';
import { AddUserComponent } from './modules/user/add-user/add-user.component';
import { LoginComponent } from './modules/user/login/login.component';
import { PersonalAreaComponent } from './modules/user/personal-area/personal-area.component';

const routes: Routes = [
 
  
    {
      path:"",component:HomePageComponent //loadChildren:()=>import("./modules/group/group.module").then(m=>m.GroupModule)
      
    },
    {
      
      path:"group-list",component:GroupListComponent
    },
    {
      path:"login",component:LoginComponent//loadChildren:()=>import("./modules/user/user.module").then(m=>m.UserModule)
      
    },
    {
      path:"addUser",component:AddUserComponent//loadChildren:()=>import("./modules/user/user.module").then(m=>m.UserModule)
    } ,
    {
      path:"group-portal",component:GroupPortalComponent//loadChildren:()=>import("./modules/group/group.module").then(m=>m.GroupModule)
    } ,
    {
      path:"group-portal/:groupId",component:GroupPortalComponent//loadChildren:()=>import("./modules/group/group.module").then(m=>m.GroupModule)
    } ,
    {
      path:"personal-area",component:PersonalAreaComponent
    } 
    // ,{ path: 'error-page', component: ErrorPageComponent }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
