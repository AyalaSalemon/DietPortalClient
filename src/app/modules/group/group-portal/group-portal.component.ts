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
import { KeyValue } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
  users: UserWithKg[] =[]// [{ id: 0, name: 'ra', kg: 50 }, { id: 1, name: "ayala", kg: 50 }, { id: 3, name: "ayala7racheli", kg: 100 }];

  message: FormGroup;
  sentedMessege: SentedMessege[] = [];
  // WeeklyGroupWinner?: WeeklyGroupWinner;
  WeeklyGroupWinners?:KeyValue<number[], number | null>;
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
    this.message = new FormGroup({
      "userMessage": new FormControl("", Validators.required),
     
    });


  }


   
  

  getGroupDetails(groupId: number) {
    this._groupService.getUserInGroupsByGroupId(groupId).subscribe(res=>{
      this.fullUsers=res
    
    },
    rej=>{})

    this._groupService.getGroupDetails(groupId).subscribe(res => {
      this.users = res.userswithkg;
      

      this.WeeklyGroupWinners = res.weeklyGroupWinner
      console.log("res.weeklyGroupWinner "+res.weeklyGroupWinner)
   debugger
      console.log("res.sentedMessege "+res.sentedmesseges[0])
      this.sentedMessege = res.sentedmesseges 
      
      this.setUsers()
      this.winnersNames=[]
      
      this.WeeklyGroupWinners?.key.forEach(
        userId=>{
console.log("userId:"+userId)
           let winner=this.fullUsers.find(user=>user.id==userId)?.firstName
           console.log("winner:"+winner)
           if(winner)
         this.winnersNames.push(winner)
         }
      )
    }
      ,
      rej => {
       
       }
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
  addMessage(){
    debugger
    const userString = sessionStorage.getItem('user')
    m: new SentedMessege(0, JSON.parse(userString ? userString : JSON.stringify(new User(1, "333", "ggg","r414@gmail.com",new Date(), 1, 50, "3124"))).id, this.groupId, this.message?.value.userMessage)
    this._groupService.addMessage(new SentedMessege(0,this.group.id, JSON.parse(userString ? userString : 
      JSON.stringify(new User(1, "333", "ggg","r414@gmail.com",new Date(), 1, 50, "3124"))).id,
        this.message?.value.userMessage)).subscribe(res=>{
          this.getGroupDetails(this.group.id)
    
    
    },
    rej=>{})

  }


}