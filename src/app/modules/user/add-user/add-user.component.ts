import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/models/gender.enum';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user?:User;
  signupForm!:FormGroup;
  @Output()
  onSignUp: EventEmitter<boolean> = new EventEmitter()
  
  gender = Gender;
  constructor(private _userService:UserService) {   
     
 }

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      "identityNumber":new FormControl("",Validators.required),
      "firstName":new FormControl("",Validators.required), 
      "lastName":new FormControl("",Validators.required),
      "email":new FormControl("",[Validators.email,Validators.required]),
      "dateOfBirth":new FormControl("",Validators.required), 
      "weight":new FormControl("",Validators.required), 
      "password":new FormControl("",[Validators.required,Validators.maxLength(4)]),
      "profileImage":new FormControl() ,
      "gender":new FormControl() ,

    });
  }
  addUser(){

var a=this.signupForm?.value.gender;
    this.user=new User(0,this.signupForm?.value.identityNumber,this.signupForm?.value.firstName
      ,this.signupForm?.value.email,this.signupForm?.value.dateOfBirth,this.signupForm?.value.gender,
      this.signupForm?.value.weight,this.signupForm?.value.password,this.signupForm?.value.lastName);

    this._userService.addUser(this.user);
    debugger
    this.onSignUp.emit(false)
  }

}
