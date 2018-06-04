import { Subject } from 'rxjs/Rx';
import { searchFilters } from '../models/searchFilters';
import * as searchAcctions from '../actions/search.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '@angular/core';
import * as fromRoot from '../../shared/reducers/index';

@Injectable()
export class SearchFiltersService implements OnInit {
    // Private Fields
    // End of Private Fields

    // Public properties
    // End of Public properties

    public searchFilters: Observable<searchFilters>;     
    // constructor
    constructor(private _store: Store<fromRoot.State>) {
        this.searchFilters = this._store.select(s => s.searchFiltersState);
    }
    // End of constructor

    ngOnInit() {

    }

    // Private methods

    /**
     * to dispatch event to load businesss list
     * 
     * @memberOf BusinessService
     */
    _setSerachParam(query :string ) {
        this._store.dispatch(new searchAcctions.SetSearchQueryAction(query));
    }

    /**
     * to dispatch event to load businesss list
     * 
     * @memberOf BusinessService
     */
    _getSerachFilters(): Promise<any> {
        return this._store.select(s => s.searchFiltersState).toPromise();
    }
}