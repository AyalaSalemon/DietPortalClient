import { SentedMessege } from "./sentedMessege.model";
import { UserWithKg } from "./userWithKg.model";
import { WeeklyGroupWinner } from "./weeklyGroupWinner.model";

export class GroupDetails{

    constructor( name: string, kg:number) {
    this. userswithkg=[]
    this.sentedMessege=[]
    
    }
    userswithkg: UserWithKg [];
    sentedMessege:SentedMessege []
    WeeklyGroupWinner1?: {[key: number]: number []}
    WeeklyGroupWinner?:WeeklyGroupWinner
}
