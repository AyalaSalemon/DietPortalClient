import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { SentedMessege } from 'src/app/models/sentedMessege.model';
import { UserWithKg } from 'src/app/models/userWithKg.model';
import { WeeklyGroupWinner } from 'src/app/models/weekliGroupWinner.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-portal',
  templateUrl: './group-portal.component.html',
  styleUrls: ['./group-portal.component.scss']
})
export class GroupPortalComponent implements OnInit {

  constructor(private _groupService: GroupService) { }
  u1:UserWithKg={ id:0,name:"ra",kg: 50 }
 users:UserWithKg[]=[{id:0,name:'ra',kg:50},{ id:1,name:"ayala",kg: 50 },{ id:3,name:"ayala7racheli",kg: 100 }];
  

  messege:SentedMessege []=[];
 WeeklyGroupWinner?:WeeklyGroupWinner;

 
 @Input()
 group?:Group
 //user1:UserWithKg={"racheli",50}
  ngOnInit(): void {
    debugger
    this.getGroupDetails(1)//this.group.id
  }

  getGroupDetails(groupId:number){
this._groupService.getGroupDetails(groupId)
  }


}