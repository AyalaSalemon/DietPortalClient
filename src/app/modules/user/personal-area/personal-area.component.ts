import { Component, OnInit } from '@angular/core';
import { Weight } from 'src/app/models/weight.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {



  constructor(private _userService:UserService) { }

  ngOnInit(): void {
   this.getUserProgress(1)
  }
  userProgress:Weight []=[]
  getUserProgress(userId:number){
   this._userService.getUserProgress(userId).subscribe(p=>this.userProgress)

  }

  chartType = 'line';

  chartDatasets = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
  ];

  chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  chartColors = [
    
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };

  chartClicked(event: any) {
    console.log(event);
  }

  chartHovered(event: any) {
    console.log(event);
  }


  

}
