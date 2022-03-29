import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { GroupDetails } from 'src/app/models/groupDetails.model';
import { userInGroup } from 'src/app/models/userInGroup.model';
import { UserWithKg } from 'src/app/models/userWithKg.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _http: HttpClient) { } 

  getAllGroups(): Observable<Group[]> {
    
        return this._http.get<Group[]>("/api/Group");
  }

  getGroupId(userId: number): Observable<number> {

    return this._http.get<number>("/api/Group/" + userId + "/User");
  }
  GetWeeklyWinnerGroup(): Observable<KeyValue<number[], number|null>> {

    return this._http.get<KeyValue<number[], number|null>>("/api/Weight/WeeklyWinnerGroup");
  }
  addUserInGroup(u:userInGroup, password?:string):Observable<any> {
debugger
if(password)
    return this._http.post<any>("/api/User/"+password, u);
    else
    return this._http.post("/api/User", u);
  }
  getGroupDetails(groupId:number): Observable<GroupDetails> {
    debugger
    return this._http.get<GroupDetails>("/api/Portal/"+groupId+"/Group");
}


  addGroup(g:Group):Observable<number> {
   return this._http.post<number>("/api/Group",g);
  }

}

