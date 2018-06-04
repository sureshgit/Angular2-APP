import { CustomClaims } from './custom-claims';
import { StringHelper } from './string-helper';
import { Injectable } from '@angular/core';
import { JWTHelper } from './jwt-helper';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/index';

@Injectable()
export class ClaimsHelperService {
    private _claims: any;
    constructor(private _store: Store<fromRoot.State>) {
        // this._store.let(fromRoot.getUserIdentity).subscribe(userIdentity => {
        //     if (userIdentity.token)
        //         this._claims = JWTHelper.getDataFromToken(userIdentity.token);
        // });
    }

    public hasRole(name: string) {
        if (!this._claims || !this._claims.role) return false;
        return (<string[]>(this._claims.role)).indexOf(name) >= 0;
    }
    public hasAnyRole(codes: string[]) {
        if (!this._claims || !this._claims.role) return false;
        codes.forEach(code => {
            if ((<string[]>(this._claims.role)).indexOf(name) >= 0) return true;
        });
        return false;
    }
    //region to assert all permission related conditions
    get canDistributeAnyDocument() {
        return this.hasAnyRole(
            [
                CustomClaims.CanAccessClientDocumentLibrary
                , CustomClaims.ViewHSDocuments
                , CustomClaims.ViewELDocuments
            ]
        )
    }
    get canDistributeAnySharedDocument() {
        return this.hasAnyRole(
            [
                , CustomClaims.CanViewELSharedDocuments
                , CustomClaims.CanViewHSSharedDocuments
            ]
        )
    }
    //end of region to assert all permission related conditions
    public getCompanyName(): string {
        return this._claims ? this._claims.CompanyName : undefined;
    }

    public getCompanyCountryId(): string {
        return this._claims ? this._claims.CompanyCountryId : undefined;
    }
    public getCompanyId(): string {
        return this._claims ? this._claims.CompanyId : undefined;
    }

    public getCompanyStructureTypeId(): string {
        return this._claims ? this._claims.CompanyStructureTypeId : undefined;
    }
    public getEmpEmail(): string {
        return this._claims ? this._claims.EmpEmail : undefined;
    }
    public getEmpHomePhone(): string {
        return this._claims ? this._claims.EmpHomePhone : undefined;
    }
    public getEmpPictureUrl(): string {
        return this._claims && this._claims.EmpPictureUrl != "00000000-0000-0000-0000-000000000000" ? this._claims.EmpPictureUrl : undefined;
    }
    public getEmpId(): string {
        return this._claims ? this._claims.EmployeeId : undefined;
    }
    public getEmpIdOrDefault(): string {
        return (this._claims && this._claims.EmployeeId) ? this._claims.EmployeeId : "00000000-0000-0000-0000-000000000000";
    }
    public getIsDeligatedAuthorizor(): boolean {
        return this._claims ? StringHelper.coerceBooleanProperty(this._claims.IsDeligatedAuthorizor) : undefined;
    }
    public getParentCompanyId(): string {
        return this._claims ? this._claims.ParentCompanyId : undefined;
    }
    public getSectorId(): string {
        return this._claims ? this._claims.SectorId : undefined;
    }
    public getSectorName(): string {
        return this._claims ? this._claims.SectorName : undefined;
    }
    public getTenantName(): string {
        return this._claims ? this._claims.TenantName : undefined;
    }
    public getUserFullName(): string {
        return this._claims ? this._claims.UserFullName : undefined;
    }
    public getUserName(): string {
        return this._claims ? this._claims.UserName : undefined;
    }
    public getSiteId(): string {
        return this._claims && this._claims.SiteId ? this._claims.SiteId : "00000000-0000-0000-0000-000000000000";
    }
    public getDepartmentId(): string {
        return this._claims && this._claims.DepartmentId ? this._claims.DepartmentId : "00000000-0000-0000-0000-000000000000";
    }
    public getAdviceCardNumber(): string {
        return this._claims && this._claims.CardNumber ? this._claims.CardNumber : undefined;
    }
    public getEmpDOB(): string {
        return this._claims ? this._claims.EmpDOB : undefined;
    }
    public getUserId(): string {
        return this._claims ? this._claims.id : undefined;
    }
    public getUserFirstName(): string {
        return this._claims ? this._claims.UserFirstName : undefined;
    }
    public getUserLastName(): string {
        return this._claims ? this._claims.UserLastName : undefined;
    }  

    public isEmployee():boolean {
        return this.hasRole('maembade');
    }
    public isHRManagerOrServiceOwner():boolean {
        return this.hasRole('cavialem');
    }
    public isHolidayAuthorizerOrManager():boolean {
        return this.hasRole('ishoau');
    }
}