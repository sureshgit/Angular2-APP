//import { extractBusinessCategorySelectItems } from '../common/business-extract-helper';
//import { AeSelectItem } from '../../atlas-elements/common/models/ae-select-item';
import { SsSortModel } from '../../ss-elements/common/models/ss-sort-model';
//import { LoadBusinessCategories } from '../actions/business.list.actions';
//import { BusinessCategory } from '../models/business-categoy';
import { filterStackTrace } from 'protractor/built/util';
import { AtlasApiResponse, PagingInfo } from '../../shared/models/atlas-api-response';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
import { BusinessView } from '../models/bisiness';
import * as businessListActions from '../actions/business-list.action';
import * as Immutable from 'immutable';

export interface BusinessesListState {
    loading: boolean;
    loaded: boolean;
    isBusinessListLoading:boolean;
    data: AtlasApiResponse<BusinessView>;
    selectedBusiness: BusinessView;
    filters: Map<string, string>;
    pagingInfo: PagingInfo;
    sortInfo: SsSortModel;
}

// export interface BusinessCategoryState {
//     loadingBusinessCategories: boolean;
//     loadedBusinessCategories: boolean;    
//     BusinessCategories: BusinessCategory[];
// }

const initialState = {
    loading: false,
    loaded: false,
    isBusinessListLoading:false,
    data: null,
    selectedBusiness: null,
    filters: null,
    pagingInfo: null,
    sortInfo: null
}

export function reducer(state = initialState, action: Action): BusinessesListState {
    switch (action.type) {
        case businessListActions.ActionTypes.LOAD_BUSINESSES:
            {
                return Object.assign({}, state, { loading: true, isBusinessListLoading:true });
            }
        case businessListActions.ActionTypes.LOAD_BUSINESSES_COMPLETE:
            {
                console.log("reducer");
                console.log(action.payload);
                return Object.assign({}, state, { loaded: true, loading: false, data: action.payload, pagingInfo: action.payload.PagingInfo, isBusinessListLoading:false });
            }
        case businessListActions.ActionTypes.LOAD_SELECTED_BUSINESS:
            {
                return Object.assign({}, state, { loading: true, isBusinessListLoading:false });
            }
        case businessListActions.ActionTypes.LOAD_SELECTED_BUSINESS_COMPLETE:
            {
                return Object.assign({}, state, { loaded: true, loading: false, selectedBusiness: action.payload });
            }
        case businessListActions.ActionTypes.CHANGE_BUSINESS_STATUS:
            {
                return Object.assign({}, state, { loading: false, isBusinessListLoading:true });
            }
        case businessListActions.ActionTypes.CHANGE_BUSINESS_STATUS_COMPLETE:
            {
                return Object.assign({}, state, { loading: true });
            }
        case businessListActions.ActionTypes.REMOVE_BUSINESS:
            {
                return Object.assign({}, state, { loaded: true, loading: false, isBusinessListLoading:true });
            }
        case businessListActions.ActionTypes.LOAD_BUSINESSES_ON_PAGE_CHANGE: {
            return Object.assign({}, state, {  isBusinessListLoading:true , loading: true, pagingInfo: Object.assign({}, state.pagingInfo, { PageNumber: action.payload.pageNumber, Count: action.payload.noOfRows }) });
        }
        case businessListActions.ActionTypes.LOAD_BUSINESSES_ON_FILTER_CHANGE: {
            return Object.assign({}, state, { isBusinessListLoading:true ,loading: true, filters: action.payload });
        }

        // case businessListActions.ActionTypes.LOAD_BUSINESS_CATEGORIES: {
        //     return Object.assign({}, state, { BusinessCategoryState: Object.assign({}, state.BusinessCategoryState, { loadingBusinessCategories: true }) });
        // }

        // case businessListActions.ActionTypes.LOAD_BUSINESS_CATEGORIES_COMPLETE: {
        //     return Object.assign({}, state, { BusinessCategoryState: Object.assign({}, state.BusinessCategoryState, { loadingBusinessCategories: false, loadedBusinessCategories: true, BusinessCategories: action.payload }) });
        // }

        case businessListActions.ActionTypes.LOAD_BUSINESSES_ON_SORT: {
            return Object.assign({}, state, { isBusinessListLoading:true, loading: true, sortInfo: Object.assign({}, state.sortInfo, { SortField: action.payload.SortField, Direction: action.payload.Direction }) });
        }
        case businessListActions.ActionTypes.SET_DEFAULT_FILTERS: {
            return Object.assign({}, state, { filters: action.payload });
        }

        default:
            return state;
    }
}

export function getBusinessesListData(state$: Observable<BusinessesListState>): Observable<AtlasApiResponse<BusinessView>> {
    console.log('state');
    console.log(state$.select(state => state).toPromise());
    return state$.select(state => state && state.data);
};

export function getBusinessesListDataLoading(state$: Observable<BusinessesListState>): Observable<boolean> {
    return state$.select(s => s.isBusinessListLoading);
};

export function getSelectedBusinessData(state$: Observable<BusinessesListState>): Observable<BusinessView> {
    return state$.select(s => s.selectedBusiness);
};


// export function getBusinessCategories(state$: Observable<BusinessesListState>): Observable<BusinessCategory[]> {
//     return state$.select(s => s.BusinessCategoryState.BusinessCategories);
// }

// export function getBusinessCategorySelectItems(state$: Observable<BusinessesListState>): Observable<AeSelectItem<string>[]> {
//     return state$.select(s => extractBusinessCategorySelectItems(s.BusinessCategoryState.BusinessCategories));
// }