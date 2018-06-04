import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Result } from '../models/Result';
import * as Immutable from 'immutable';
import { RestClientService } from '../data/rest-client.service';
import { LoaderService } from '../services/navigate-loader.service';
import { Subscription } from 'rxjs/Subscription';
import { searchFilters } from '../models/searchFilters';
import { SearchFiltersService } from '../services/searchFilters.service';
import { Observable } from 'rxjs/Observable';
import { Http, URLSearchParams } from '@angular/http';
import * as fromRoot from '../../shared/reducers/index';
import { Store } from '@ngrx/store';
import {
LoadResultsAction,
SetDefaultResultFiltersAction
} from '../actions/searchresult.action';


@Injectable()
export class SearchResultService implements OnInit, OnDestroy {

  public _resultsList: Immutable.List<Result>;
  private _searchFilterSub : Subscription;
  private _searchFilters : Observable<searchFilters>;
  constructor(private _data: RestClientService,
  	private _LoaderService : LoaderService,
  	private _searchFiltersService: SearchFiltersService,
    private _store: Store<fromRoot.State>) {
  	 };

  ngOnInit() {
  }

    // Private methods

    /**
     * to dispatch event to load businesss list
     * 
     * @memberOf BusinessService
     */
     _loadBusinesses(){
        this._store.dispatch(new LoadResultsAction(true));
    }

    /**
     * to dispatch event to set default filters
     * @param {Map<string, string>} filters 
     * 
     * @memberOf BusinessService
     */
    _setDefaultFitlers(filters: Map<string, string>) {
        this._store.dispatch(new SetDefaultResultFiltersAction(filters));
    }

    ngOnDestroy(){
  		//this._searchFilterSub.unsubscribe();
	}

}
