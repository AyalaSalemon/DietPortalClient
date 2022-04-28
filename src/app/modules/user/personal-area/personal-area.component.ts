import { Component, OnInit} from '@angular/core';
import { Weight } from 'src/app/models/weight.model';
import { UserService } from '../user.service';
import { Group } from 'src/app/models/group.model';


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
  group?:Group;
  displayedColumns: string[] = ['WeekNumber', 'Date', 'weight','kg'];
  progress:Weight[]=[
    new Weight(4,5,new Date(),100,34),
    new Weight(4,5,new Date(),100,34),
    new Weight(4,5,new Date(),100,34),
    new Weight(4,5,new Date(),100,34),
  ]
  
  dataSource:ShowProgress[]=[]
  constructor(private _userService: UserService){
  

   }
  
  async ngOnInit(): Promise<void> {
    var stringGroup=sessionStorage.getItem("group")
    this.group=JSON.parse(stringGroup?stringGroup:JSON.stringify(new Group(0,"g",true,new Date(22,4,22),3,1))) as Group
    var firstWeek=new Date(this.group.startDate).getTime()
    await this.getUserProgress(this._userService.user?.id || 0)
    this.progress.forEach(w=>{
      var point:ShowProgress={       
        WeekNumber:Math.floor((w.Date.getTime()-firstWeek)/ (60 * 60 * 24 * 1000)/7) ,
        Date:w.Date,
        weight:w.currentWeight,
        kg:w.kg
      }
      this.dataSource.push(point)
    })
  }
  async getUserProgress(userId:number){
    this._userService.getUserProgress(userId).subscribe(p=>this.progress)
 
   }
}
