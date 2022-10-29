import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;

  @Output()
  onLogin: EventEmitter<boolean> = new EventEmitter()

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {


    this.loginForm = new FormGroup({
      "name": new FormControl("", Validators.required),
      "password": new FormControl("", [Validators.required, Validators.maxLength(4)])
    });

  }
  async logIn() {
    // this.onLogin.emit(false)
    // return
    //  const b= await this._userService.getUser(this.loginForm?.value.name, this.loginForm?.value.password)
    //   this.onLogin.emit(b)
    this._userService.login(this.loginForm?.value.name, this.loginForm?.value.password).subscribe(user => {
      this._userService.setCurrentUser(user);
      this.onLogin.emit(false);
    });
  }



}







