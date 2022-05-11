export class SentedSystemMessege{
        constructor(id:number, groupId:number,messegeId:number){
this.id=id
this.groupId=groupId
this.messegeId=messegeId
this.time=new Date(Date.now())
        }
     id:number  
     groupId:number 
     messegeId:number
     time:Date
}
