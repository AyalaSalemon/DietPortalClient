import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { SentedMessege } from 'src/app/models/sentedMessege.model';
import { UserWithKg } from 'src/app/models/userWithKg.model';
import { WeeklyGroupWinner } from 'src/app/models/weeklyGroupWinner.model';
import { GroupService } from '../group.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-group-portal',
  templateUrl: './group-portal.component.html',
  styleUrls: ['./group-portal.component.scss']
})
export class GroupPortalComponent implements OnInit {

  constructor(private _groupService: GroupService, private actRouter: ActivatedRoute, private router: Router) {
    const groupString = sessionStorage.getItem('group')
    this.group = JSON.parse(groupString ? groupString : JSON.stringify(new Group(1, "3", true, new Date(), 3, 1, "3124")))
  }
  u1: UserWithKg = { id: 0, name: "ra", kg: 50 }
  users: UserWithKg[] = [{ id: 0, name: 'ra', kg: 50 }, { id: 1, name: "ayala", kg: 50 }, { id: 3, name: "ayala7racheli", kg: 100 }];


  sentedMessege: SentedMessege[] = [];
  WeeklyGroupWinner?: WeeklyGroupWinner;
  winnersNames!:string[]
  @Input()
  groupId!: number
  fullUsers!:User[]
  group: Group
  subscription?: Subscription
  ngOnInit(): void {



    // this.actRouter.paramMap.subscribe(p=>this.groupId=Number(p.get('groupId')))          
    // debugger
    this.getGroupDetails(this.group.id)

  }

  getGroupDetails(groupId: number) {
    this._groupService.getUserInGroupsByGroupId(groupId).subscribe(res=>{
      this.fullUsers=res
    
    },rej=>{})

    this._groupService.getGroupDetails(groupId).subscribe(res => {
      this.users = res.userswithkg;
      this.WeeklyGroupWinner = res.WeeklyGroupWinner
      this.sentedMessege = res.sentedMessege 
      this.setUsers()
    }
      ,
      rej => { }
    );
  
  
  
  }
  setUsers(){
    this.fullUsers.forEach(user=>{
      if(!this.users.find(u=>u.id==user.id)){
                 this.users.push({ id: user.id, name: user.firstName, kg: 0 })
      }
    }
      
      )
  }
  enterPersonalArea() {

    this.router.navigate(['personal-area'], { skipLocationChange: true });
  }


}