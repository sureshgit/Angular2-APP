export class EmployeeSettings {
    public CompanyId: string;
    public Id: string;
    public StartTimeHours: string;
    public EndTimeHours: string;
    public HolidayEntitlement: number;
    public NoOfTimesResubmit: number;
    public NoOfTimesEscalate: number;
    public FiscalStartDate?: Date;
    public FiscalEndDate?: Date;
    public CanEmployeeAddAbsences: boolean;
    public CanEmployeeAddHolidays: boolean;
    public CanEmployeeViewAbsenceHistory: boolean;
    public IsExcessHolidayAllowed: boolean;
    public HolidayUnitType: HolidayUnitType;
    public AllowCarryForwardHolidays: boolean;
    public MaxCarryForwardDays?: number;
    public MaxCarryForwardHours?: number;
    public CarryForwardExpDays?: number;
    public DaysPerWeek: number;
    public LunchDuration: number;
    constructor(daysPerWeek: number,
        companyId: string,
        holidayEntitlement: number,
        noOfTimesEscalate: number,
        noOfTimesResubmit: number,
        canEmployeeAddHolidays: boolean,
        startTimeHours: string,
        endTimeHours: string,
        fiscalStartDate: Date,
        fiscalEndDate: Date,
        allowCarryForwardHolidays: boolean) {
        this.DaysPerWeek = daysPerWeek;
        this.HolidayEntitlement = holidayEntitlement;
        this.CompanyId = companyId;
        this.NoOfTimesEscalate = noOfTimesEscalate;
        this.NoOfTimesResubmit = noOfTimesResubmit;
        this.CanEmployeeAddHolidays = canEmployeeAddHolidays;
        this.StartTimeHours = startTimeHours;
        this.EndTimeHours = endTimeHours;
        this.FiscalStartDate = fiscalStartDate;
        this.FiscalEndDate = fiscalEndDate;
        this.AllowCarryForwardHolidays = allowCarryForwardHolidays;
    }
}

export enum HolidayUnitType {
    Days = 1,
    Hours = 2
}

export class FiscalYear {
    public StartDate: Date;
    public EndDate: Date;
    public DisplayName: string;
    public StartYear: number;
    public EndYear: number;
    public IsDBFiscalYear: boolean;
    public Order: number;

    constructor() {
        this.DisplayName = '';
        this.StartDate = new Date();
        this.EndDate = new Date();
        this.StartYear = 0;
        this.EndYear = 0;
        this.Order = 0;
        this.IsDBFiscalYear = false;
    }
}

export class AbsenceType {
    public Id: string;
    public CompanyId: string;
    public TypeName: string;
    public Color: string;
    public PictureId: string;
    public IsExample: boolean;
    public AbsenceCode: AbsenceCode;

    constructor() {
        this.Id = '';
        this.TypeName = '';
        this.CompanyId = '';
        this.Color = '';
        this.IsExample = false;
        this.PictureId = '';
    }
}

export class AbsenceSubType {
    public Id: string;
    public CompanyId: string;
    public Name: string;
    public AbsenceTypeId: string;

    constructor() {
        this.Id = '';
        this.Name = '';
        this.CompanyId = '';
        this.AbsenceTypeId = '';
    }
}

export class AbsenceCode {
    public Id: string;
    public Name: string;
    public Code: number;
}
