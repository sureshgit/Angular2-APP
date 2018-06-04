import { controlPath } from '@angular/forms/src/directives/shared';
import { isNullOrUndefined } from 'util';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
export class CommonValidators {
    static email(): ValidatorFn {
        return (control) => {
            let email = control.value ? control.value : null;
            if (isNullOrUndefined(email)) {
                return null;
            }
            return null
        };
    }
    static min(minValue: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } => {
            let value = control.value ? control.value : null;
            if (!isNullOrUndefined(value)) {
                if (isNaN(value))
                    return null;
                if (Number(value) >= minValue)
                  return null
                    return { 'min': true };
            

            }
            return null;
        };
    }

    static max(maxValue: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } => {
            let value = control.value ? control.value : null;
            if (!isNullOrUndefined(value)) {
                if (isNaN(value))
                    return null;
                if (Number(value) <= maxValue)               
                 return null
                      return { 'max': true };
            }
            return null;
        };
    }

    static required = Validators.required;
    static requiredTrue = Validators.requiredTrue;
    static minLenght = Validators.minLength;
    static maxLength = Validators.maxLength;
    static pattern = Validators.pattern;
    static nullValidator = Validators.nullValidator;
    static compose = Validators.compose;

}
