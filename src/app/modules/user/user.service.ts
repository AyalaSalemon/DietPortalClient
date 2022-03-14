import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: User;
  b: boolean = true

  constructor(private _http: HttpClient, private router: Router) { }


  getUserById(id: number):Observable<User> {
    return this._http.get<User>("/api/Group/"+id+"/User")
  }
  async getUser(name: string, password: string): Promise<boolean> {
    await this._http.get<User>("/api/User/" + name + "/" + password).subscribe(res => {

      this.user = res
      alert("Hi to " + this.user?.firstName + "!!!!")
      this.b = false

      this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
      // this.router.navigateByUrl('/group-list', { skipLocationChange: true }).then(() => {
        this.router.navigate(['group-list'], { skipLocationChange: true });
      // });
    }
      ,
      rej => { this.b = true }
    );
    return this.b
  }

  addUser(u: User) {
debugger 

    return this._http.post<any>("/api/User", u);
  }

}