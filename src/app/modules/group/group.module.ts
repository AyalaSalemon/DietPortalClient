import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupPortalComponent } from './group-portal/group-portal.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { GroupService } from './group.service';
import {MatCardModule} from '@angular/material/card';
import {SplitterModule} from 'primeng/splitter';
import { UserService } from '../user/user.service';
import { DialogModule } from 'primeng/dialog';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: "group-portal", component:GroupPortalComponent},
 
  { path: "group-list", component:GroupListComponent},
];

@NgModule({
  declarations: [
    GroupListComponent,
    GroupPortalComponent,
    AddGroupComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatCardModule,
    CommonModule,
    SplitterModule,
    DialogModule
   
  ],
  providers:[GroupService,UserService],
  exports:[]
})

export class GroupModule { }
