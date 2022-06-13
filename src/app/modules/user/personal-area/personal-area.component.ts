import { Component, OnInit } from '@angular/core';
import { Weight } from 'src/app/models/weight.model';
import { UserService } from '../user.service';
import { Group } from 'src/app/models/group.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';


export interface ShowProgress {
  WeekNumber: number;
  Date: Date;
  weight: number;
  kg: number;

}
@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {
  newWeightForm!: FormGroup;
  group?: Group;
  displayedColumns: string[] = ['WeekNumber', 'Date', 'weight', 'kg'];
  progress: Weight[] = [
    new Weight(4, 5, new Date(), 100, 34),
    new Weight(4, 5, new Date(), 100, 34),
    new Weight(4, 5, new Date(), 100, 34),
    new Weight(4, 5, new Date(), 100, 34),
  ]

  dataSource: ShowProgress[] = []
  constructor(private _userService: UserService) {


  }

  ngOnInit() {
    this._userService.geCurrenttUser().subscribe(user => {
      this.buildForm(user);
    })

  }

  async buildForm(user: User | null):Promise<void> {
    this.newWeightForm = new FormGroup({
      "weight": new FormControl("", Validators.required)
    })
    var stringGroup = sessionStorage.getItem("group")
    this.group = JSON.parse(stringGroup ? stringGroup : JSON.stringify(new Group(0, "g", true, new Date(22, 4, 22), 3, 1))) as Group
    var firstWeek = new Date(this.group.startDate).getTime()
    await this.getUserProgress(user?.id || 0)
    this.progress.forEach(w => {
      var point: ShowProgress = {
        WeekNumber: Math.floor((w.Date.getTime() - firstWeek) / (60 * 60 * 24 * 1000) / 7),
        Date: w.Date,
        weight: w.currentWeight,
        kg: w.kg
      }
      this.dataSource.push(point)
    })
  }

  async getUserProgress(userId: number) {
    debugger
    this._userService.getUserProgress(userId).subscribe(p => this.progress = p)
    

  }
  addWeight() {
    const userString = sessionStorage.getItem('user')
    const user = JSON.parse(userString ? userString : JSON.stringify(new User(1, "9", "l", "v", new Date(), 1, 76, "0000")))

    if (this.group && this.newWeightForm) {
      debugger
      const weight: Weight = new Weight(user.id, this.group?.id, new Date(), this.newWeightForm?.value['weight'], 5)
      this._userService.addWeight(weight).subscribe();
    }


  }
}
