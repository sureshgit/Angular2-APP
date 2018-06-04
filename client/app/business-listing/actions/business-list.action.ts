
import { SsSortModel } from '../../ss-elements/common/models/ss-sort-model';
//import { BusinessCategory } from '../models/business-categoy';
import { AtlasApiResponse, PagingInfo } from '../../shared/models/atlas-api-response';
import { Action } from '@ngrx/store';
import { type } from '../../shared/utils';
import { BusinessView } from '../models/bisiness';
import * as Immutable from 'immutable';

export const ActionTypes = {
    LOAD_BUSINESSES: type('[BusinessView] Load business list'),
    LOAD_BUSINESSES_COMPLETE: type('[BusinessView] Load business list complete'),
    LOAD_SELECTED_BUSINESS: type('[Business] Load selected Business'),
    LOAD_SELECTED_BUSINESS_COMPLETE: type('[Business] Load selected business complete'),
    CHANGE_BUSINESS_STATUS: type('[Business] change business status'),
    CHANGE_BUSINESS_STATUS_COMPLETE: type('[Business] change business status complete'),
    REMOVE_BUSINESS: type('[Business] remove business'),
    LOAD_BUSINESSES_ON_PAGE_CHANGE: type('[BusinessView] Load business list on page change'),
    LOAD_BUSINESSES_ON_FILTER_CHANGE: type('[BusinessView] Load business list on filter change'),
    SET_DEFAULT_FILTERS: type('[BusinessView] Set default filters'),
    LOAD_BUSINESS_CATEGORIES: type('[BusinessView] Load business categories'),
    LOAD_BUSINESS_CATEGORIES_COMPLETE: type('[BusinessView] Load business categories complete'),
    LOAD_BUSINESSES_ON_SORT: type('[BusinessView] Load business categories on sort')
};

export class LoadBusinessesAction implements Action {
    type = ActionTypes.LOAD_BUSINESSES;
    constructor(public payload: boolean) {

    }
}

export class LoadBusinessesCompleteAction implements Action {
    type = ActionTypes.LOAD_BUSINESSES_COMPLETE;
    constructor(public payload: AtlasApiResponse<BusinessView>) {
    }    
}

export class LoadSelectedBusinessAction implements Action {
    type = ActionTypes.LOAD_SELECTED_BUSINESS;
    constructor(public payload: string) {

    }
}

export class LoadSelectedBusinessCompleteAction implements Action {
    type = ActionTypes.LOAD_SELECTED_BUSINESS_COMPLETE;
    constructor(public payload: BusinessView) {
    }
}

export class ChangeBusinessAction implements Action {
    type = ActionTypes.CHANGE_BUSINESS_STATUS;
    constructor(public payload: BusinessView) {
    }
}

export class ChangeBusinessCompleteAction implements Action {
    type = ActionTypes.CHANGE_BUSINESS_STATUS_COMPLETE;
    constructor(public payload: BusinessView) {
    }
}

export class RemoveBusinessAction implements Action {
    type = ActionTypes.REMOVE_BUSINESS;
    constructor(public payload: BusinessView) {
    }
}

export class LoadBusinessesOnPageChangeAction implements Action {
    type = ActionTypes.LOAD_BUSINESSES_ON_PAGE_CHANGE;
    constructor(public payload: { pageNumber: number, noOfRows: number }) {

    }
}

export class LoadBusinessesOnFilterChangeAction implements Action {
    type = ActionTypes.LOAD_BUSINESSES_ON_FILTER_CHANGE;
    constructor(public payload: Map<string, string>) {

    }
}

export class SetDefaultFiltersAction implements Action {
    type = ActionTypes.SET_DEFAULT_FILTERS;
    constructor(public payload: Map<string, string>) {

    }
}


export class LoadBusinessCategories implements Action {
    type = ActionTypes.LOAD_BUSINESS_CATEGORIES;
    constructor(public payload: boolean) {

    }
}

// export class LoadBusinessCategoriesComplete implements Action {
//     type = ActionTypes.LOAD_BUSINESS_CATEGORIES_COMPLETE;
//     constructor(public payload: BusinessCategory[]) {

//     }
// }

export class LoadBusinessesOnSortAction implements Action {
    type = ActionTypes.LOAD_BUSINESSES_ON_SORT;
    constructor(public payload: SsSortModel) {

    }
}


// tslint:disable-next-line:eofline
export type Actions = LoadBusinessesAction | LoadBusinessesCompleteAction | LoadSelectedBusinessAction | LoadSelectedBusinessCompleteAction | LoadBusinessesOnPageChangeAction | LoadBusinessesOnFilterChangeAction | SetDefaultFiltersAction | LoadBusinessCategories  | LoadBusinessesOnSortAction | ChangeBusinessAction | ChangeBusinessCompleteAction;
//LoadBusinessCategoriesComplete

