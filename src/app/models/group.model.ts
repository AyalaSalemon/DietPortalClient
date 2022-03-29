
import { Status } from "./status.enum";

export class Group {



    constructor(id: number, groupName: string, isOpen: boolean,
        startDate: Date, numOfWeeks: number, status: Status, password?: string, managerId?: number, genderId?:number,
        minAge=0,
        maxAge=120
    ) {
        this.id = id;
        this.groupName = groupName;
        this.managerId = managerId;
        this.isOpen = isOpen;
        this.password = password;
        this.startDate = startDate;
        this.numOfWeeks = numOfWeeks;
        this.status = status;
        this.genderId=genderId;
        this.minAge=minAge;
        this.maxAge=maxAge




    }

    id: number;
    groupName: string;
    managerId?: number;
    isOpen: boolean;
    password?: string;
    startDate: Date;
    numOfWeeks: number;
    status: Status;
    genderId?:number
    minAge=0
    maxAge=120


}