import { Component, OnInit, ViewChild } from '@angular/core';
import { Weight } from 'src/app/models/weight.model';
import { UserService } from '../user.service';
import { Group } from 'src/app/models/group.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { MatTable } from '@angular/material/table';


export interface ShowProgress {
  weekNumber: number;
  date: Date;
  weight: number;
  kg: number;

}
@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss']
})

export class PersonalAreaComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  newWeightForm!: FormGroup;
  group?: Group;
  displayedColumns: string[] = ['weekNumber', 'date', 'weight', 'kg'];
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

  async buildForm(user: User | null): Promise<void> {
    this.newWeightForm = new FormGroup({
      "weight": new FormControl("", Validators.required)
    })
    var stringGroup = sessionStorage.getItem("group")
    this.group = JSON.parse(stringGroup ? stringGroup : JSON.stringify(new Group(0, "g", true, new Date(22, 4, 22), 3, 1))) as Group
    var firstWeek = new Date(this.group.startDate).getTime()
    await this.getUserProgress(user?.id || 0).subscribe(p => {
      this.progress = p
      this.progress.forEach(w => {
        debugger
        var point: ShowProgress = {
          weekNumber: Math.floor((new Date(w.date).getTime() - firstWeek) / (60 * 60 * 24 * 1000) / 7),
          date: w.date,
          weight: w.currentWeight,
          kg: w.kg
        }
        this.dataSource.push(point)
      })
      this.table.renderRows();
    },
      rej => {
      }
    )
  }

  getUserProgress(userId: number): Observable<Weight[]> {
    return this._userService.getUserProgress(userId)
  }



  addWeight() {
    const userString = sessionStorage.getItem('user')
    const user = JSON.parse(userString ? userString : JSON.stringify(new User(1, "9", "l", "v", new Date(), 1, 76, "0000")))

    if (this.group && this.newWeightForm) {
      const weight: Weight = new Weight(user.id, this.group?.id, new Date(), this.newWeightForm?.value['weight'], 5)
      this._userService.addWeight(weight).subscribe();
    }


  }

}
