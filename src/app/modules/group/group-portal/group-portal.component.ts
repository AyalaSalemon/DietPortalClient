import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { SentedMessege } from 'src/app/models/sentedMessege.model';
import { UserWithKg } from 'src/app/models/userWithKg.model';
import { WeeklyGroupWinner } from 'src/app/models/weekliGroupWinner.model';
import { GroupService } from '../group.service';
import { ActivatedRoute } from '@angular/router';  

@Component({
  selector: 'app-group-portal',
  templateUrl: './group-portal.component.html',
  styleUrls: ['./group-portal.component.scss']
})
export class GroupPortalComponent implements OnInit {

  constructor(private _groupService: GroupService,private actRouter: ActivatedRoute,private router: Router) { }
  u1:UserWithKg={ id:0,name:"ra",kg: 50 }
 users:UserWithKg[]=[{id:0,name:'ra',kg:50},{ id:1,name:"ayala",kg: 50 },{ id:3,name:"ayala7racheli",kg: 100 }];
  

 sentedMessege :SentedMessege []=[];
 WeeklyGroupWinner?:WeeklyGroupWinner;
 @Input()
 groupId!:number
 subscription?:Subscription
  ngOnInit(): void {
    this.enterPersonalArea()
    this.actRouter.paramMap.subscribe(p=>this.groupId=Number(p.get('groupId')))          
    debugger
     this.getGroupDetails(this.groupId)
     
  }

  getGroupDetails(groupId:number){
this._groupService.getGroupDetails(groupId).subscribe(res => {
this.users=res.userswithkg;
this.WeeklyGroupWinner=res.WeeklyGroupWinner
this.sentedMessege=res.sentedMessege
}
  ,
  rej => { }
);}
enterPersonalArea() {

  this.router.navigate(['personal-area'], { skipLocationChange: true });
}


}