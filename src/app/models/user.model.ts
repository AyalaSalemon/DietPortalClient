import { Gender } from "./gender.enum";


export class User{
  
  
    constructor(id:number,identityNumber:string, firstName:string,email:string,dateOfBirth:Date,gender: Gender,weight:number, password:string
        ,lastName?:string){
      this.id=id;
      this. identityNumber= identityNumber;
      this.firstName= firstName;
      this.lastName=lastName;
      this.email=email;
      this.dateOfBirth=dateOfBirth;
      this.gender=gender;
      this.weight=weight;
      this.password=password;

    
    }

    id:number;
    identityNumber:string;
    firstName:string;
    lastName?:string;
    email:string;
    dateOfBirth:Date;
    gender: Gender;
    weight:number;
    password:string;
    profile?:ImageBitmap;//= new ImageBitmap();//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



}