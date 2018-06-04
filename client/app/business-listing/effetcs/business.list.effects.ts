import { SortDirection } from '../../ss-elements/common/models/ss-sort-model';
//import { extractBusinessCategories } from '../common/task-extract-helper';
//import { LoadBusinessHeadBannerAction } from '../actions/task-information-bar.actions';
//import { BusinessCategory } from '../models/task-categoy';
import { ExtractionResult } from '@angular/compiler/src/i18n/extractor_merger';
import { ClaimsHelperService } from '../../shared/helpers/claims-helper';
import { AtlasApiResponse, PagingInfo } from '../../shared/models/atlas-api-response';
import { BusinessView } from '../models/bisiness';
import { Observable } from 'rxjs/Rx';
import { RestClientService } from '../../shared/data/rest-client.service';
import { Http, URLSearchParams } from '@angular/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromRoot from '../../shared/reducers/index';
import {
    ActionTypes,
    ChangeBusinessCompleteAction,
    LoadSelectedBusinessCompleteAction,
    LoadBusinessesAction,
    LoadBusinessesCompleteAction
} from '../actions/business-list.action';

import { LoaderService } from '../../shared/services/navigate-loader.service';

@Injectable()
export class BusinessesListEffects {
    constructor(private _data: RestClientService, private _actions$: Actions, private _store: Store<fromRoot.State>, private _claimsHelper: ClaimsHelperService, private _navLoaderService : LoaderService) {

    }

    // tslint:disable-next-line:member-ordering
    @Effect()
    businessesInfo$: Observable<Action> = this._actions$.ofType(ActionTypes.LOAD_BUSINESSES, ActionTypes.LOAD_BUSINESSES_ON_PAGE_CHANGE, ActionTypes.LOAD_BUSINESSES_ON_FILTER_CHANGE, ActionTypes.LOAD_BUSINESSES_ON_SORT)
        .map(toPayload)
        .withLatestFrom(this._store, (payload, state) => { return { _payload: payload, _state: state.businessesListState }; })
        .switchMap((payLoad) => {
            let params: URLSearchParams = new URLSearchParams();
            //params.set('CourseByName','photo');

            // tslint:disable-next-line:max-line-length
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
            // if (payLoad._state.sortInfo) {
            //     params.set('sortField', payLoad._state.sortInfo.SortField);
            //     params.set('direction', payLoad._state.sortInfo.Direction === SortDirection.Ascending ? 'asc' : 'desc');
            // }
            // else {
            //     //params.set('sortField', 'DueDate');
            //     //params.set('direction', 'desc');
            // }

            //End of Sorting
            this._navLoaderService.show()

            return this._data.get('course', { search: params });
        })
        .map((res) => {
            console.log('effect');
            this._navLoaderService.hide()
            return new LoadBusinessesCompleteAction(<AtlasApiResponse<BusinessView>>res.json());
        });

    @Effect()
    selectedBusiness$: Observable<Action> = this._actions$.ofType(ActionTypes.LOAD_SELECTED_BUSINESS)
        .switchMap((action) => {
            let params: URLSearchParams = new URLSearchParams();
            let taskId = action.payload;
            let apiUrl = 'BusinessView/' + taskId;
            params.set('fields', 'Id,Title,Status,Priority,CreatedOn,DueDate,Description,AssignedTo,AssignedUserName,CreatedBy,CreatedByUserName,BusinessCategoryId,BusinessCategoryName,CorrectiveActionTaken,CostOfRectification,PercentageCompleted,CompanyId');
            return this._data.get(apiUrl, { search: params });
        })
        .map((res) => {
            return new LoadSelectedBusinessCompleteAction(res.json());
        });

    // @Effect()
    // taskCategories$: Observable<Action> = this._actions$.ofType(ActionTypes.LOAD_BUSINESS_CATEGORIES)
    //     .switchMap((action) => {
    //         let params: URLSearchParams = new URLSearchParams();
    //         params.set('fields', 'Id,Name');
    //         params.set('action', 'getspecificfields');
    //         //Paging
    //         params.set('pageNumber', '0');
    //         params.set('pageSize', '0');
    //         //End of Paging

    //         //Sorting
    //         params.set('sortField', 'Name');
    //         params.set('direction', 'asc');
    //         //End of Sorting           
    //         return this._data.get('BusinessCategory', { search: params });
    //     })
    //     .map((res) => {
    //         return new LoadBusinessCategoriesComplete(extractBusinessCategories(res));
    //     });

    // @Effect()
    // updateBusinessStatus$: Observable<Action> = this._actions$.ofType(ActionTypes.CHANGE_BUSINESS_STATUS)
    //     .map(task => task.payload)
    //     .switchMap((task) => {
    //         let params: URLSearchParams = new URLSearchParams();
    //         let taskId = task.Id;
    //         const status = task.Status;
    //         params.set('taskId', taskId);
    //         params.set('status', status);
    //         return this._data.post('Business', null, { search: params })
    //     }).map((res) => {
    //         this._store.dispatch(new LoadBusinessHeadBannerAction(true));
    //         this._store.dispatch(new LoadBusinessesAction(true));
    //         return new ChangeBusinessCompleteAction(res.json());
    //     });

    // @Effect()
    // deleteBusiness$: Observable<Action> = this._actions$.ofType(ActionTypes.REMOVE_BUSINESS)
    //     .map(task => task.payload)
    //     .switchMap((task) => {
    //         let params: URLSearchParams = new URLSearchParams();
    //         params.set('id', task.Id);
    //         return this._data.delete('Business', { search: params })
    //     }).map((result) => {
    //         this._store.dispatch(new LoadBusinessHeadBannerAction(true));
    //         return new LoadBusinessesAction(true);
    //     });
}