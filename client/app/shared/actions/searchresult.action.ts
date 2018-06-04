
import { SsSortModel } from '../../ss-elements/common/models/ss-sort-model';
import { AtlasApiResponse, PagingInfo } from '../../shared/models/atlas-api-response';
import { Action } from '@ngrx/store';
import { type } from '../../shared/utils';
import { Result } from '../../shared/models/Result';
import * as Immutable from 'immutable';

export const ActionTypes = {
    LOAD_RESULTS: type('[Result] Load result list'),
    LOAD_RESULTS_COMPLETE: type('[Result] Load result list complete'),
    SET_DEFAULT_RESULT_FILTERS: type('[Result] Set default filters')
};

export class LoadResultsAction implements Action {
    type = ActionTypes.LOAD_RESULTS;
    constructor(public payload: boolean) {

    }
}

export class LoadResultsCompleteAction implements Action {
    type = ActionTypes.LOAD_RESULTS_COMPLETE;
    constructor(public payload: AtlasApiResponse<Result>) {
    }    
}

export class SetDefaultResultFiltersAction implements Action {
    type = ActionTypes.SET_DEFAULT_RESULT_FILTERS;
    constructor(public payload: Map<string, string>) {

    }
}


export type Actions = LoadResultsAction | LoadResultsCompleteAction | SetDefaultResultFiltersAction;

