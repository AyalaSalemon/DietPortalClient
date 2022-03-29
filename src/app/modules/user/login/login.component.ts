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
    this.onLogin.emit(await this._userService.getUser(this.loginForm?.value.name, this.loginForm?.value.password))
  }



}
  






