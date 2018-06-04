import { SortDirection } from '../../ss-elements/common/models/ss-sort-model';
import { ExtractionResult } from '@angular/compiler/src/i18n/extractor_merger';
import { ClaimsHelperService } from '../../shared/helpers/claims-helper';
import { AtlasApiResponse, PagingInfo } from '../../shared/models/atlas-api-response';
import { Result } from '../../shared/models/Result';
import { Observable } from 'rxjs/Rx';
import { RestClientService } from '../../shared/data/rest-client.service';
import { Http, URLSearchParams } from '@angular/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromRoot from '../../shared/reducers/index';
import {
    ActionTypes,
    LoadResultsAction,
	LoadResultsCompleteAction
} from '../../shared/actions/searchresult.action';
import { SearchFiltersService } from '../../shared/services/searchFilters.service';

import { LoaderService } from '../../shared/services/navigate-loader.service';

@Injectable()
export class SearchResultsEffects {
    constructor(private _data: RestClientService,
     private _actions$: Actions,
     private _store: Store<fromRoot.State>, 
     private _claimsHelper: ClaimsHelperService, 
     private _navLoaderService : LoaderService,
     private _searchFiltersService: SearchFiltersService) {

    }

    @Effect()
    searchResultInfo$: Observable<Action> = this._actions$.ofType(ActionTypes.LOAD_RESULTS)
        .map(toPayload)
        .withLatestFrom(this._store, (payload, state) => { return { _payload: payload, _state: state.searchResultsState }; })
        .switchMap((payLoad) => {
            let params: URLSearchParams = new URLSearchParams();
            //params.set('fields', 'Id,Title,Status,Priority,DueDate,AssignedUserName,CreatedByUserName,BusinessCategoryId,BusinessCategoryName');
            //params.set('isPublic', 'true');
            
            //Paging
            // if (payLoad._state.pagingInfo) {
            //     params.set('pageNumber', payLoad._state.pagingInfo.PageNumber.toString());
            //     params.set('pageSize', payLoad._state.pagingInfo.Count.toString());
            // }
            // else {
                 params.set('pageNumber', '1');
                 params.set('pageSize', '10');
            // }
            //End of Paging

            //Filtering
            if (payLoad._state.filters && payLoad._state.filters.size > 0) {
                payLoad._state.filters.forEach((value: string, key: string) => {
                    params.set(key, value);
                });
            }

            // End of Filtering



            //Sorting
            if (payLoad._state.sortInfo) {
                params.set('sortField', payLoad._state.sortInfo.SortField);
                params.set('direction', payLoad._state.sortInfo.Direction === SortDirection.Ascending ? 'asc' : 'desc');
            }
            else {
                //params.set('sortField', 'DueDate');
                //params.set('direction', 'desc');
            }

            //End of Sorting



            params.set('pageNumber', '1');
            params.set('pageSize', '10');
            this._navLoaderService.show();

            return this._data.get('course', { params: params });
        })
        .map((res) => {
            this._navLoaderService.hide()
            return new LoadResultsCompleteAction(<AtlasApiResponse<Result>>res.json());
        });
}