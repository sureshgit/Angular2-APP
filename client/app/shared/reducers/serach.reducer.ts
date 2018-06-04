import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { searchFilters } from '../models/searchFilters';
import * as serachActions from '../actions/search.actions';
import '@ngrx/core/add/operator/select';

export interface searchFiltersState 
{
    query: null,
    category: null,
    subcategory: null,
    location: null,
    business: null,
    offering: null,    
    state : null,
    isRefreshing: false
}

const initialstate: searchFiltersState = {
    query: null,
    category: null,
    subcategory: null,
    location: null,
    business: null,
    offering: null,    
    state : null,
    isRefreshing: false
}

export function reducer(state = initialstate, action: Action): searchFiltersState {
    switch (action.type) {
        case serachActions.ActionTypes.SET_SEARCH_QUERY:
            {
                let newState = Object.assign({}, state, { query: action.payload });
                newState.query = action.payload;
                return newState;
            }
        // case userIdentityActions.ActionTypes.SET_OAUTH_NONCE:
        //     {
        //         let newState = Object.assign({}, state, { nonce: action.payload.nonce, state: action.payload.state, url: action.payload.url });
        //         newState.nonce = action.payload.nonce;
        //         return newState;
        //     }
        // case userIdentityActions.ActionTypes.RESET_AUTH_DATA:
        //     {
        //         return Object.assign({}, new Identity(), { url: state.url });
        //     }
        // case userIdentityActions.ActionTypes.SET_INITIAL_STATE:
        //     {
        //         return Object.assign({}, action.payload);
        //     }
        // case userIdentityActions.ActionTypes.REFRESH_TOKEN:
        // case userIdentityActions.ActionTypes.REFRESH_TOKEN_COMPLETE:
        //     {
        //         return Object.assign({}, new Identity(), { isRefreshing: action.payload });
        //     }

        default:
            return state;
    }
}

export function getSerahQuery(state$: Observable<searchFilters>) {
    return state$.select(s => s.query);
}