import { ValidatorFn } from '@angular/forms';
import { type } from '../utils';
import * as Immutable from 'immutable';
export interface IFormBuilderVM {
    name: string;
    getFields(): Immutable.List<IFormFieldWrapper<any>>;
}

export interface IFormFieldWrapper<T> {
    labelText: string;
    templateRefId: string;
    field: IFormField<T> | IFormBuilderVM;
}

export interface IFormField<T> {
    name: string;
    type: FormFiledType;
    initialValue: T;
    validators: ValidatorFn | ValidatorFn[]
}

export enum FormFiledType {
    InputString,
    InputNumber,
    InputEmail,
    CheckBox,
    Radio,
    RadioGroup,
    AutoComplete,
    AutoComplteMultiSelect,
    Select,
    ReadOnly
}
