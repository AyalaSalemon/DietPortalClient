import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/models/gender.enum';
import { ImageSnippet } from 'src/app/models/image-snippet.model';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user!: User;
  signupForm!: FormGroup;
  @Output()
  onSignUp: EventEmitter<boolean> = new EventEmitter()

  gender = Gender;
  private _selectedFile!: ImageSnippet;
 imageSrc!: string;
  
  constructor(private _userService: UserService) {

  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      "identityNumber": new FormControl("", Validators.required),
      "firstName": new FormControl("", Validators.required),
      "lastName": new FormControl("", Validators.required),
      "email": new FormControl("", [Validators.email, Validators.required]),
      "dateOfBirth": new FormControl("", Validators.required),
      "weight": new FormControl("", Validators.required),
      "password": new FormControl("", [Validators.required, Validators.maxLength(4)]),
      "profileImage": new FormControl(),
      "gender": new FormControl(),

    });
  }
  addUser() {
    debugger
    var a = this.signupForm?.value.gender;
    this.user = new User(0, this.signupForm?.value.identityNumber, this.signupForm?.value.firstName
      , this.signupForm?.value.email, this.signupForm?.value.dateOfBirth, this.signupForm?.value.gender,
      this.signupForm?.value.weight, this.signupForm?.value.password, this.signupForm?.value.lastName);

    this._userService.addUser(this.user).subscribe(
      res=>{
        
       this.user.id=res      
        this._userService.setCurrentUser(this.user); 

        if (this._selectedFile) {
          this._userService.postImage(this._selectedFile, this.user?.id).subscribe(succ => { console.log("save image succ") })
        }
        
      }
      ,rej=>{ 
        debugger
      }
    );
   

    this.onSignUp.emit(false)
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this._selectedFile = new ImageSnippet(file, event.target.result);

        this.imageSrc = reader.result as string;

        this.signupForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }

}
