import { GeneratedFile } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from 'src/app/models/gender.enum';
import { Group } from 'src/app/models/group.model';
import { Status } from 'src/app/models/status.enum';
import { userInGroup } from 'src/app/models/userInGroup.model';
import { UserService } from '../../user/user.service';
import { GroupService } from '../group.service';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {


  group?:Group
  public s = Status
  public g = Gender
  groups: Group[] = []
  insertPassword: boolean = false

  constructor(private _groupService: GroupService, private _userService: UserService, private router: Router) {
  }



  ngOnInit(): void {
    this._groupService.getAllGroups().subscribe(g => {
      this.groups = g
      if (this._userService.user) {
        this._groupService.getGroupByUserId(this._userService.user.id).subscribe(
          group => {
            sessionStorage.setItem('group',JSON.stringify(group));
            this.group= group
            console.log(this.group.id)
            this.groups.sort(
              (a: Group, b: Group): number => {
                var ca = 0
                var cb = 0
                if (this.group?.id == a.id) {
                  console.log("-1 a:", a.id, " b:", b.id)
                  return -1
                }
                if (this.group?.id == b.id) {
                  console.log("1a:", a.id, " b:", b.id)
                  return 1
                }

                ca += this.degree(a)
                cb += this.degree(b)
                console.log(ca - cb, "a:", a.id, " b:", b.id)
                return cb - ca

              }
            )

          })

      }
    })


  }

  degree(g: Group): number {
    var count = 0
    if (g.status != 1) {
      if (g.status == 0)
        count = -4
      if (g.status == 2)
        count = -5
    }
    else {
      if (this._userService.user) {
        var d = new Date(this._userService.user.dateOfBirth)
        if (g.minAge <= ((new Date()).getFullYear() - d.getFullYear()))
          count++
        if (g.maxAge >= ((new Date()).getFullYear() - d.getFullYear()))
          count++
        if (g.genderId == this._userService.user.gender)
          count++
      }
    }
    return count
  }




  getAllGroups() {
    this._groupService.getAllGroups().subscribe(g => this.groups = g)
  }
  joinOpenGroup(groupId: number) {
    if (!this._userService.user)
      alert("You have to sign up")
    debugger
    if (this._userService.user) {
      var u: userInGroup = new userInGroup(groupId,this._userService.user.id )
      this._groupService.addUserInGroup(u);

    }
  }
  joinCloseGroup(groupId: number, top: number, left: number, password?: string) {
    if (!this._userService.user) {
      alert("You have to sign up")
      return;
    }

    this.insertPassword = true
    debugger
    if (this._userService.user) {
      var u: userInGroup = new userInGroup(groupId,this._userService.user.id )
      this._groupService.addUserInGroup(u, password);

    }



  }
  enterGroup() {

    this.router.navigate(['group-portal',this.group?.id], { skipLocationChange: true });
  }

}


