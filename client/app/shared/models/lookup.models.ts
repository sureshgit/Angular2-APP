export class County {
    Id: string;
    Name: string;
}

export class Country {
    Id: string;
    Name: string;
}

export class UserList {
    Id: string;
    FirstName: string;
    LastName: string;
}

export class EmployeeRelations {
    Id: string;
    Name: string;
}

export class EthnicGroup{
    Id:string;
    Name:string;
    EthnicGroupTypeId:string;
    EthnicGroupValueType:number;
    SequenceId:number;
    EthnicGroupTypeSequenceId:number;
    EthnicGroupTypeName:string;
}

export class AbsenceStatus {
    Id: string;
    Name: string;
    Code: AbsenceStatusCode;
    IsRequestedStatus: boolean;

    constructor() {
        this.Id = '';
        this.Name = '';
        this.Code = null;
        this.IsRequestedStatus = false;
    }
}

export enum AbsenceStatusCode {
    Requested = 1,
    Resubmitted = 2,
    Escalated = 3,
    Approved = 4,
    Declined = 5,
    Cancelled = 6,
    Requestforchange = 7,
    Requestforcancellation = 8
}
