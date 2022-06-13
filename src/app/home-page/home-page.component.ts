import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../models/user.model';
import { GroupService } from '../modules/group/group.service';
import { UserService } from '../modules/user/user.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  currectUser:User|null
  addGroupAble: boolean =false
   
  constructor(private router: Router, private _groupService: GroupService, private _userService: UserService) { }
  displayLogin: boolean = false
  displaySignUp: boolean = false
  displayAddGroup: boolean = false
  userName!: string[]
  weeklyWinnerGroups!: KeyValue<number[], number | null>;
  ngOnInit(): void {
this._userService.geCurrenttUser().subscribe(user=>this.currectUser=user)
    this._groupService.GetWeeklyWinnerGroup().subscribe(data => {
      this.weeklyWinnerGroups = data
      this.weeklyWinnerGroups.key.forEach(userId => {
        this._userService.getUserById(userId)
          .subscribe(u => this.userName.push(u.firstName))

      })
    })
this.addGroupAble=
(this.currectUser != null && this._groupService.getGroupByUserId(this.currectUser?.id) != null)

  }
  getUserById(id: number) {
    this._userService.getUserById(id).subscribe(user => user.firstName)
  }
  showLogin(b: boolean) {

    this.displayLogin = b;

  }

  showSignUp(b: boolean) {

    this.displaySignUp = b;
  }
  showAddGroup(b: boolean) {

    this.displayAddGroup = b;
  }

  onLoginClicked(status: boolean) {
    this.showLogin(status)
  }

}
