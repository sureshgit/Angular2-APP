import { ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation } from '@angular/core';
declare var $: any;
declare var jQuery: any;
import { Result } from '../../models/Result';
import * as Immutable from 'immutable';
import { RestClientService } from '../../data/rest-client.service';
import { LoaderService } from '../../services/navigate-loader.service';
import { searchFilters } from '../../models/searchFilters';
import { SearchFiltersService } from '../../services/searchFilters.service';
import { SearchResultService } from '../../services/searchresult.service';
import { ObjectHelper } from '../../helpers/object-helper';
import { MessageEvent, MessageStatus } from '../../../ss-elements/common/models/message-event.enum';
import { SnackbarMessageVM } from '../../models/snackbar-message-vm';
import { MessageType } from '../../../ss-elements/common/ae-message.enum';
import { MessengerService } from '../../services/messenger.service';
import { isNullOrUndefined } from 'util';
import { SsSortModel } from '../../../ss-elements/common/models/ss-sort-model';
import { PagingInfo } from '../../models/atlas-api-response';
import {
LoadResultsAction,
LoadResultsCompleteAction
} from '../../actions/searchresult.action';
import { any } from 'codelyzer/util/function';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs/Rx';
import * as fromRoot from '../../reducers/index';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ss-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ResultListComponent implements OnInit, OnDestroy {

// Private,Public Fields
  private _searchResults: BehaviorSubject<Immutable.List<Result>>;
  private _businessesLoading$: Observable<boolean>;
  public _resultsList: Immutable.List<Result>;
  private _searchFilterSub : Subscription;
  private _searchFilters : Observable<searchFilters>;
  private _filters: Map<string, string>;
  private _searchresultSubscription: Subscription;
  private _totalRecords = new BehaviorSubject(0);    
// Fileds

  constructor(private _data: RestClientService,
  	private _LoaderService : LoaderService,
  	private _searchFiltersService: SearchFiltersService,
  	private _searchResultService: SearchResultService,
    private _cdRef: ChangeDetectorRef,
    private _store: Store<fromRoot.State>,
    private _messenger: MessengerService) {
  		this._searchFilters = this._searchFiltersService.searchFilters;
      this._filters = new Map<string, string>();
      this._filters.set('coursebyname', 'photo');
      this._searchResults = new BehaviorSubject(Immutable.List<Result>([]));
  	 };

  ngOnInit(): void {
    this._searchResultService._loadBusinesses();

    this._searchFilterSub = this._searchFilters.subscribe(filters => {
        this._filters.set('coursebyname',filters.query);
        this._searchResultService._setDefaultFitlers(this._filters);
        this._searchResultService._loadBusinesses();
    });

    this._searchresultSubscription = this._store.let(fromRoot.getSerachResults).subscribe((results) => {
      if (!isNullOrUndefined(results)) {

         let entitiesList = Immutable.List<Result>(results.Entities);
         this._resultsList = entitiesList;
        if (results.PagingInfo && results.PagingInfo.PageNumber === 1) {
          this._totalRecords.next(results.PagingInfo.TotalCount);
        }
        this._searchResults.next(entitiesList);
        this._cdRef.markForCheck();
      }

    });



  	// this._searchFilterSub = this._searchFilters.subscribe(filters => {

  	// 	 this._searchResultService._loadBusinesses(filters.query).then(res => {
  	// 		this._resultsList = res.json().Entities;
  	// 		this._LoaderService.hide();
  	// 	 });
  	// });
  }


  swithToGrid()
  {
    $('.grid').removeClass("active");
    $('.list').addClass("active");
    $('.item-list').addClass("make-list");
    $('.item-list').removeClass("make-grid");
    $('.item-list').removeClass("make-compact");
    $('.item-list .add-desc-box').removeClass("col-sm-9");
    $('.item-list .add-desc-box').addClass("col-sm-7");
  }

  swithToList(){
    $('.list').removeClass("active");
    $('.switchToList').addClass("active");
    $('.item-list').addClass("make-grid");
    $('.item-list').removeClass("make-list");
    $('.item-list').removeClass("make-compact");
    $('.item-list .add-desc-box').removeClass("col-sm-9");
    $('.item-list .add-desc-box').addClass("col-sm-7");
  }

  ngOnDestroy(){
  	this._searchFilterSub.unsubscribe();
    this._searchresultSubscription.unsubscribe();
  }

}
