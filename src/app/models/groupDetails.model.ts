import { SentedMessege } from "./sentedMessege.model";
import { UserWithKg } from "./userWithKg.model";
import { WeeklyGroupWinner } from "./weeklyGroupWinner.model";
import { KeyValue } from '@angular/common';

export class GroupDetails {

    constructor(name: string, kg: number) {
        this.userswithkg = []
        this.sentedmesseges = []

    }
    userswithkg: UserWithKg[];
    sentedmesseges: SentedMessege[]
    // WeeklyGroupWinner1?: KeyValue<number[], number | null>;
    // WeeklyGroupWinner1?: {[key: number]: number []}
    weeklyGroupWinner?: KeyValue<number[], number | null>
    // WeeklyGroupWinner?:WeeklyGroupWinner
}
