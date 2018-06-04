import { SsSortModel } from '../../ss-elements/common/models/ss-sort-model';
import { filterStackTrace } from 'protractor/built/util';
import { AtlasApiResponse, PagingInfo } from '../../shared/models/atlas-api-response';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
import { Result } from '../../shared/models/Result';
import * as serachResultListActions from '../actions/searchresult.action';
import * as Immutable from 'immutable';

export interface SearchResultListState {
    loading: boolean;
    loaded: boolean;
    isResultListLoading:boolean;
    data: AtlasApiResponse<Result>;
    selectedResult: Result;
    filters: Map<string, string>;
    pagingInfo: PagingInfo;
    sortInfo: SsSortModel;
}

const initialState = {
    loading: false,
    loaded: false,
    isResultListLoading:false,
    data: null,
    selectedResult: null,
    filters: null,
    pagingInfo: null,
    sortInfo: null
}

export function reducer(state = initialState, action: Action): SearchResultListState {
    switch (action.type) {
        case serachResultListActions.ActionTypes.LOAD_RESULTS:
            {
                return Object.assign({}, state, { loading: true, isResultListLoading:true });
            }
        case serachResultListActions.ActionTypes.LOAD_RESULTS_COMPLETE:
            {
                return Object.assign({}, state, { loaded: true, loading: false, data: action.payload, pagingInfo: action.payload.PagingInfo, isResultListLoading:false });
            }
        case serachResultListActions.ActionTypes.SET_DEFAULT_RESULT_FILTERS:
            {
                return Object.assign({}, state, { filters : action.payload });
            }            

        default:
            return state;
    }
}

export function getSerachResults(state$: Observable<SearchResultListState>): Observable<AtlasApiResponse<Result>> {
    return state$.select(state => state && state.data);
};

export function getSerachResultsLoading(state$: Observable<SearchResultListState>): Observable<boolean> {
    return state$.select(s => s.isResultListLoading);
};