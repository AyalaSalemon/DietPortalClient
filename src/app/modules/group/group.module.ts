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
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import{MatIconModule} from '@angular/material/icon';



const routes: Routes = [
  { path: "group-portal", component:GroupPortalComponent},
 
  { path: "group-list", component:GroupListComponent,outlet:"homePageRouter"}//,outlet:"homePageRouter"},
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
    DialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule
   
  ],
  providers:[GroupService,UserService],
  exports:[GroupListComponent,AddGroupComponent]
})

export class GroupModule { }
