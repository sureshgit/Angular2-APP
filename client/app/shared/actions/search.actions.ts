import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../utils';
import { searchFilters } from '../models/searchFilters';


//@Injectable()
export const ActionTypes = {
    SET_SEARCH_QUERY: type('[searchFilters] Set Query'),
    SET_SEARCH_CATEGORY: type('[searchFilters] Set Category'),
    SET_SEARCH_BUSINESS: type('[searchFilters] Set Business'),
    SET_SEARCH_SUBCATEGORY: type('[searchFilters] Set SubCategory'),
    SET_SEARCH_LOCATION: type('[searchFilters] Set Location'),
    SET_SEARCH_OFFERING: type('[searchFilters] Set Offering'),
	SET_SEARCH_URL: type('[searchFilters] Set Url'),

    RESET_SEARCH: type('[searchFilters] Reset Serach'),
    SET_INITIAL_STATE: type('[searchFilters] Set Initial State'),
    SEARCH_START: type('[searchFilters] Start Sreach'),
    SEARCH_COMPLETE: type('[searchFilters] Serach Complete')
}

export class SetSearchQueryAction implements Action {
    type = ActionTypes.SET_SEARCH_QUERY;

    constructor(public payload: string) {

    }
}

export class SetSearchCategoryAction implements Action {
    type = ActionTypes.SET_SEARCH_CATEGORY;

    constructor(public payload: searchFilters) {

    }
}

export class SetSearchSubCategoryAction implements Action {
    type = ActionTypes.SET_SEARCH_SUBCATEGORY;

    constructor(public payload: searchFilters) {

    }
}

export class SetSearchLoactionAction implements Action {
    type = ActionTypes.SET_SEARCH_LOCATION;

    constructor(public payload: searchFilters) {

    }
}

export class SetSearchBusinessAction implements Action {
    type = ActionTypes.SET_SEARCH_BUSINESS;

    constructor(public payload: searchFilters) {

    }
}

export class SetSearchOfferingAction implements Action {
    type = ActionTypes.SET_SEARCH_OFFERING;

    constructor(public payload: searchFilters) {

    }
}

export class SetInitialStateAction implements Action {
    type = ActionTypes.SET_INITIAL_STATE;

    constructor(public payload: searchFilters) {

    }
}

export class ResetSearchAction implements Action {
    type = ActionTypes.RESET_SEARCH;

    constructor(public payload: boolean) {

    }
}

export class SearchStartAction implements Action {
    type = ActionTypes.SEARCH_START;

    constructor(public payload: boolean) {

    }
}

export class SearchCompleteAction implements Action {
    type = ActionTypes.SEARCH_COMPLETE;

    constructor(public payload: boolean) {

    }
}

export type Actions = SetInitialStateAction | SetSearchQueryAction | SetSearchCategoryAction | SetSearchLoactionAction | SetSearchOfferingAction | SetSearchBusinessAction | SetSearchSubCategoryAction | ResetSearchAction | SearchCompleteAction;

