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
  navigateToLogin() {

  }


  constructor(private router: Router, private _groupService: GroupService, private _userService: UserService) { }
  displayLogin: boolean = false
  displaySignUp: boolean = false
  userName!: string[]
  weeklyWinnerGroups!: KeyValue<number[], number | null>;
  ngOnInit(): void {
    debugger
    this.router.navigate([{ outlets: { homePageRouter: ['group-list'] } }])
    this._groupService.GetWeeklyWinnerGroup().subscribe(data => {
      this.weeklyWinnerGroups = data
      this.weeklyWinnerGroups.key.forEach(userId => {
        this._userService.getUserById(userId)
          .subscribe(u => this.userName.push(u.firstName))
          
      })
    })
  }
  getUserById(id:number){
    this._userService.getUserById(id).subscribe(u=>u.firstName)    
  }
  showLogin(b: boolean) {

    this.displayLogin = b;
  }

  showSignUp(b: boolean) {

    this.displaySignUp = b;
  }

}
