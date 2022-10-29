export class Weight {

    constructor(userId: number, groupId: number, date: Date,
        currentWeight: number, kg: number) {
        this.id = 0;
        this.userId = userId;
        this.groupId = groupId;
        this.date = date;
        this.currentWeight = currentWeight;
        this.kg = kg


    }
    id: number
    userId: number
    groupId: number
    date: Date
    currentWeight: number
    kg: number
}
