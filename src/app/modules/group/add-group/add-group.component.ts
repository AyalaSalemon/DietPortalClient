import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/models/gender.enum';
import { Group } from 'src/app/models/group.model';
import { UserService } from '../../user/user.service';
import { GroupService } from '../group.service';
import { userInGroup } from 'src/app/models/userInGroup.model';
import { User } from 'src/app/models/user.model';



@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  addGroupForm!: FormGroup;
 currentUser:User|null
  gender = Gender;
  g!: Group;
  numOfWeeks:number=4;
  @Output()
  onAddGroup: EventEmitter<boolean> = new EventEmitter()
  constructor(private _userService: UserService, private _groupService: GroupService) { }

  ngOnInit(): void {
    this._userService.geCurrenttUser().subscribe(user => {
      this.currentUser=user})

  this.buildAddGroupForm()
  }
  buildAddGroupForm(){
    this.addGroupForm = new FormGroup({
      "groupName": new FormControl("", Validators.required),
      "numOfWeeks": new FormControl(""),
      "isClosed": new FormControl(true),
      "gender": new FormControl(),
      "minAge": new FormControl(""),
      "maxAge": new FormControl(""),
      "password": new FormControl(""),
    });

  }
  addGroup() {
    debugger
    var uig;
     if(this.addGroupForm?.value.numOfWeeks){
     this.numOfWeeks=this.addGroupForm?.value.numOfWeeks
    }
    if(this.addGroupForm?.value.isClosed){
      if(!this.addGroupForm?.value.password){
         alert("A closed group need a password!")
      return;
      }
      else{
        this.g = new Group(0, this.addGroupForm?.value.groupName, !this.addGroupForm?.value.isClosed,
          new Date(),this.numOfWeeks, 1, this.addGroupForm?.value.password, this.currentUser?.id,undefined,undefined,undefined);
      }
     
    }
   else{
     this.g = new Group(0, this.addGroupForm?.value.groupName, !this.addGroupForm?.value.isClosed,
      new Date(),this.numOfWeeks, 1,undefined, this.currentUser?.id,
      this.addGroupForm?.value.gender,this.addGroupForm?.value.minAge,this.addGroupForm?.value.maxAge);

   }
    
    this._groupService.addGroup(this.g).subscribe(groupId => {

      uig = new userInGroup(groupId, this.currentUser?.id)
      this._groupService.addUserInGroup(uig).subscribe(f=>this.onAddGroup.emit(false));

    }
    )

  }

}
