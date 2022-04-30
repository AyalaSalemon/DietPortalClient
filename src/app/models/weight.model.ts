export class Weight{

    constructor( name: string, kg:number, userId :number,
        groupId:number, dateTime:Date, currentWeight:number) {
    this.id=0;
    this.name=name;
    this.kg=kg
    this.userId=userId
    this.groupId=groupId
    this.dateTime=dateTime
    this.currentWeight=currentWeight
        
    
    }
    id: number
   name:string
   kg:number
   userId :number
   groupId:number
   dateTime:Date
   currentWeight:number
}
