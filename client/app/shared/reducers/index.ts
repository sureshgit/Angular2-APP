import { Identity } from '../models/Identity';
import * as searchFiltersState from '../reducers/serach.reducer';
import * as fromBusinessesList from '../../business-listing/reducers/business-list.reducer';
import * as fromSearchResults from '../reducers/searchresults.reducer';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { compose } from '@ngrx/core/compose';

export interface State 
{
    userIdentity: Identity;
    searchFiltersState: searchFiltersState.searchFiltersState;
    businessesListState: fromBusinessesList.BusinessesListState;
    searchResultsState: fromSearchResults.SearchResultListState;
}

const reducers = {
    searchFiltersState: searchFiltersState.reducer,
    businessesListState: fromBusinessesList.reducer,
    searchResultsState: fromSearchResults.reducer
 }

const combineReducer: ActionReducer<State> = combineReducers(reducers);

 export function reducer(state: any, action: any) {
    return combineReducer(state, action);
}

// UserIdentity functions

export function getUserIdentity(state$: Observable<State>) {
    return state$.select(state => state.userIdentity);
}
// UserIdentity functions

// START of Businesses list functions
export function getBusinessesListState(state$: Observable<State>) {
    return state$.select(state => state.businessesListState);
}

export const getBusinessesListLoadingData = compose(fromBusinessesList.getBusinessesListDataLoading, getBusinessesListState);

export const getBusinessesListData = compose(fromBusinessesList.getBusinessesListData, getBusinessesListState);

export const getSelectedBusinessData = compose(fromBusinessesList.getSelectedBusinessData, getBusinessesListState);

// End of Businesses list functions

// SEARCH FILTERS FUNCTION START

export function getSearchFiltersState(state$: Observable<State>) {
    return state$.select(state => state.searchFiltersState);
}

export const getSearchQuery = compose(searchFiltersState.getSerahQuery, getSearchFiltersState);

// SEARCH FILTERS FUNCTION END

export function getSerachResultsState(state$: Observable<State>) {
    return state$.select(state => state.searchResultsState);
}


export const getSerachResultsLoadingStatus = compose(fromSearchResults.getSerachResultsLoading, getSerachResultsState);

export const getSerachResults = compose(fromSearchResults.getSerachResults, getSerachResultsState);

// SEARCH RESULTS FUNCTION START




