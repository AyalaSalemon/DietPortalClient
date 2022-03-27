import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/models/gender.enum';
import { Group } from 'src/app/models/group.model';
import { UserService } from '../../user/user.service';
import { GroupService } from '../group.service';
import { userInGroup } from 'src/app/models/userInGroup.model';



@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  addGroupForm!: FormGroup;
  gender = Gender;
  g!: Group;
  numOfWeeks:number=4;
  @Output()
  onAddGroup: EventEmitter<boolean> = new EventEmitter()
  constructor(private _userService: UserService, private _groupService: GroupService) { }

  ngOnInit(): void {
    this.addGroupForm = new FormGroup({
      "groupName": new FormControl("", Validators.required),
      "numOfWeeks": new FormControl(""),
      "isClosed": new FormControl(),
      "gender": new FormControl(),
      "minAge": new FormControl(""),
      "maxAge": new FormControl(""),
      "password": new FormControl(""),
    });

  }
  addGroup() {
    debugger
    var uig;
    if(this.addGroupForm?.value.isClosed){
      if(!this.addGroupForm?.value.password)
      alert("A closed group need a password!")
      return;
    }
    if(this.addGroupForm?.value.numOfWeeks){
     this.numOfWeeks=this.addGroupForm?.value.numOfWeeks
    }
    this.g = new Group(0, this.addGroupForm?.value.groupName, !this.addGroupForm?.value.isClosed,
      new Date(),this.numOfWeeks, 1, this.addGroupForm?.value.password, this._userService.user?.id);

    this._groupService.addGroup(this.g).subscribe(groupId => {

      uig = new userInGroup(groupId, this._userService.user?.id)
      this._groupService.addUserInGroup(uig).subscribe(f=>this.onAddGroup.emit(false));

    }
    )

  }

}
