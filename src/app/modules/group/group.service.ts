import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { GroupDetails } from 'src/app/models/groupDetails.model';
import { userInGroup } from 'src/app/models/userInGroup.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  

  constructor(private _http: HttpClient) { } 

  getAllGroups(): Observable<Group[]> {
    
        return this._http.get<Group[]>("/api/Group");
  }

  getGroupById(groupId: number): Observable<Group> {

    return this._http.get<Group>("/api/Group/" + groupId);
  }
  getGroupByUserId(userId: number): Observable<Group> {

    return this._http.get<Group>("/api/Group/" + userId + "/User");
  }
  GetWeeklyWinnerGroup(): Observable<KeyValue<number[], number|null>> {

    return this._http.get<KeyValue<number[], number|null>>("/api/Weight/WeeklyWinnerGroup");
  }
 
  addUserInGroup(u:userInGroup, password?:string):Observable<any> {

if(password)
    return this._http.post<any>("/api/User/"+password, u);
    else
    return this._http.post("/api/User", u);
  }
  getGroupDetails(groupId:number): Observable<GroupDetails> {
        return this._http.get<GroupDetails>("/api/Portal/"+groupId+"/Group");
}
getUserInGroupsByGroupId(groupId:number): Observable<User[]>{
  return this._http.get<User[]>("/api/User/"+groupId+"/Group");
}


  addGroup(g:Group):Observable<number> {
   return this._http.post<number>("/api/Group",g);
  }
  setStatus(g:Group){
    return this._http.put<number>("/api/Group",g);
  }

}

