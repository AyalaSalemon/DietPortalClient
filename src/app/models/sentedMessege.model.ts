import { Time } from "@angular/common"

export class SentedMessege{
    
    constructor( id: number ,groupId: number,userId: number,content:string) {
       this.id=id
       this.groupId=groupId
       this.userId=userId
       this.time= new Date(Date.now());
       this.content=content

    }

    id: number
    groupId: number
    userId: number
    time:Date
    content:string
}