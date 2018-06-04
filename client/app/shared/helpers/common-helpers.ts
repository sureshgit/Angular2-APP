import { StringHelper } from './string-helper';
import { isNullOrUndefined } from 'util';
import { IFormBuilderVM, IFormField } from '../models/iform-builder-vm';
import { environment } from '../../../environments/environment';
export class CommonHelpers {
    static writeToConsole(data: any) {
        console.log(data);
    }
    static writeExceptionToConsole(ex: any) {
        if (!environment.production) {
            CommonHelpers.writeToConsole(ex.constructor.name);
            CommonHelpers.writeToConsole(ex.context);
            CommonHelpers.writeToConsole(ex.message);
        }
    }

    static isIFormBuilderTypeGaurd<T>(field: IFormBuilderVM | IFormField<T>): field is IFormBuilderVM {
        return (<IFormBuilderVM>field).getFields !== undefined;
    }

    static isIFormFieldTypeGaurd<T>(field: IFormBuilderVM | IFormField<T>): field is IFormField<T> {
        let iformField = <IFormField<T>>field;
        return iformField.name !== undefined
            && iformField.initialValue !== undefined
            && iformField.type !== undefined;
    }

    static checkIsValidStartAndEndDates(startDateTimestamp: any, endDateTimestamp: any): boolean {
        //if any of the value does not exits then return null
        if (StringHelper.isNullOrUndefined(startDateTimestamp) || StringHelper.isNullOrUndefined(endDateTimestamp)) return null;

        startDateTimestamp = Date.parse(startDateTimestamp);
        endDateTimestamp = Date.parse(endDateTimestamp);
        //console.log((endDateTimestamp < startDateTimestamp))
        return (startDateTimestamp <= endDateTimestamp) ? true : false;
    }
}
