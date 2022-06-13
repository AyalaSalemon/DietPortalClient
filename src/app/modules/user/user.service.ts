import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Weight } from 'src/app/models/weight.model';
import { ImageSnippet } from 'src/app/models/image-snippet.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // user?: User;
  b: boolean = true
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private _http: HttpClient, private router: Router) { }

  geCurrenttUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  setCurrentUser(user: User | null): void {
    sessionStorage.setItem('user', JSON.stringify(user))
    this.currentUser$.next(user);
  }

  getUserById(id: number): Observable<User> {
    return this._http.get<User>("/api/Group/" + id + "/User")
  }

  login(name: string, password: string):Observable<User> {
   return this._http.get<User>("/api/User/" + name + "/" + password);
    // return this.b
  }
  // async getUser(name: string, password: string): Promise<boolean> {
  //   await this._http.get<User>("/api/User/" + name + "/" + password).subscribe(res => {
  //     sessionStorage.setItem('user', JSON.stringify(res))
  //     this.user = res
  //     alert("Hi to " + this.user?.firstName + "!!!!")
  //     this.b = false;
  //     this.currentUser$
  //   }
  //     ,
  //     rej => { this.b = true }
  //   );
  //   return this.b
  // }
  postImage(_imageSrc: ImageSnippet,eId?:number)
  {
    const formData = new FormData();
    formData.append('image', _imageSrc.file);
    debugger;
    return this._http.post<number>("/api/Event/image/" + eId ,formData);
  }

  addUser(u: User) :Observable<number>{
   return this._http.post<number>("/api/User", u);
  }
  getUserProgress(userId: number): Observable<Weight[]> {
    return this._http.get<Weight[]>("/api/Weight/User/" + userId)
  }



  addWeight(w: Weight): Observable<number> {
    return this._http.post<number>("/api/Weight", w);
  }
}

