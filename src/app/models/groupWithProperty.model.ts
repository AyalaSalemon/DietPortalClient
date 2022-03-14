import { Status } from "./status.enum";

export class Group {



    constructor(groupId: number, groupName: string, isOpen: boolean,
        startDate: Date, numOfWeeks: number, status: Status, password?: string, managerId?: number
    ) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.managerId = managerId;
        this.isOpen = isOpen;
        this.password = password;
        this.startDate = startDate;
        this.numOfWeeks = numOfWeeks;
        this.status = status;



    }

    groupId: number;
    groupName: string;
    managerId?: number;
    isOpen: boolean;
    password?: string;
    startDate: Date;
    numOfWeeks: number;
    status: Status;
    genderId?:number
    minAge?:number
    maxAge?:number
}