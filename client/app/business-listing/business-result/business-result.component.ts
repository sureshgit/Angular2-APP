import { ObjectHelper } from '../../shared/helpers/object-helper';
import { MessageEvent, MessageStatus } from '../../ss-elements/common/models/message-event.enum';
import { SnackbarMessageVM } from '../../shared/models/snackbar-message-vm';
import { MessageType } from '../../ss-elements/common/ae-message.enum';
import { MessengerService } from '../../shared/services/messenger.service';
import { isNullOrUndefined } from 'util';
import { SsSortModel } from '../../ss-elements/common/models/ss-sort-model';
import { BusinessService } from '../services/business-service';
import { PagingInfo } from '../../shared/models/atlas-api-response';

import {
  LoadSelectedBusinessAction,
  LoadBusinessesAction,
  LoadBusinessesOnFilterChangeAction,
  LoadBusinessesOnPageChangeAction,
  LoadBusinessesOnSortAction,
  SetDefaultFiltersAction
} from '../actions/business-list.action';
import { any } from 'codelyzer/util/function';
//import { AeFilterControlType } from '../../atlas-elements/common/ae-filter-controltype.enum';
import { Title } from '@angular/platform-browser';
//import { AeSelectItem } from '../../atlas-elements/common/models/ae-select-item';
//import { AeFilterItem } from '../../atlas-elements/common/models/ae-filter-item';
//import { AeFilterSearchMode } from '../../atlas-elements/common/ae-filter-searchmode.enum';
//import { Priority } from '../models/task-priority';
//import { AeDataTableAction } from '../../atlas-elements/common/models/ae-data-table-action';
//import { BusinessStatus } from '../models/task-status';
//import { AeDatatableComponent } from '../../atlas-elements/ae-datatable/ae-datatable.component';
import { Store } from '@ngrx/store';
//import { LocaleService, TranslationService } from 'angular-l10n';
//import { BaseComponent } from '../../shared/base-component';
import { BusinessView } from '../models/bisiness';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs/Rx';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import * as Immutable from 'immutable';
import * as fromRoot from '../../shared/reducers/index';
import { ActivatedRoute } from '@angular/router';


declare var $: any;

@Component({
  selector: 'ss-business-result',
  templateUrl: './business-result.component.html',
  styleUrls: ['./business-result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BusinessResultComponent implements OnInit, OnDestroy {

// Private Fields
  private _businesses: BehaviorSubject<Immutable.List<BusinessView>>;
  public _businessesList: Immutable.List<BusinessView>;
  private _businessesLoading$: Observable<boolean>;
  private _keys = Immutable.List(['Id', 'Title', 'Status', 'Priority', 'TaskCategoryName', 'DueDate', 'CreatedByUserName', 'AssignedUserName']);
  private _totalRecords = new BehaviorSubject(0);
  // private _viewTypeOptions: Immutable.List<AeSelectItem<TaskViewType>>;
  // private _dueFilterOptions: Immutable.List<AeSelectItem<string>>;
  // private _priorityOptions: Array<any>;
  // private _statusOptions: Array<any>;
  // private _actions: Immutable.List<AeDataTableAction>
  private _todoActionCommand = new Subject();
  private _inProgressActionCommand = new Subject();
  private _completeActionCommand = new Subject();
  private _updateTaskCommand = new Subject();
  private _removeTaskCommand = new Subject();
  // private _businessViewFilter: TaskViewType;
  private _businessStatusFIlter: Array<any>;
  private _businessPriorityFlter: Array<any>;
  // private _dataSouceType: AeDatasourceType;
  private _pagingInfo: PagingInfo;
  private _filters: Map<string, string>;
  //private _businessCategories: TaskCategory[];
  private _businessCategoryOptions: Array<any>;
  private _todoActionSubsription: Subscription;
  private _inProgressActionSubsription: Subscription;
  private _completeActionSubscription: Subscription;
  private _updateTaskSubscription: Subscription;
  private _removeTaskSubscription: Subscription;
  private _removableTask: BusinessView;
  private _showRemoveDialog: boolean = false;
  private _businessViewDueFilter: string;
  //private _defaultViewType: TaskViewType;
  private _businessListSubscription: Subscription;
  private _businessCategoriesSubscription: Subscription;
  private isAdd: boolean = false;
  private isUpdate: boolean = false;
  private isDetails: boolean = false;
  private _objectType: string;
  private sub: any;
  /**
     * Subscription
     * 
     * @private
     * @type {Subscription}
     * @memberOf TaskUpdateComponent
     */
  private _updateTaskCompleteSubscription: Subscription;
  // End of Private Fields

  // Public properties
  // End of Public properties

  // Public Output bindings
  // End of Public Output bindings

  // Public ViewChild bindings
  // End of Public ViewChild bindings

  // Public ViewContent bindings
  // End of Public ViewContent bidnings

  // constructor

  constructor(
    //_localeService: LocaleService,
    //_translationService: TranslationService,
    private _cdRef: ChangeDetectorRef,
    private _store: Store<fromRoot.State>,
    private _businessService: BusinessService,
    private _messenger: MessengerService,
    private _route: ActivatedRoute
  ) {
    //super(_localeService, _translationService, _cdRef);
    // this._businessViewFilter = TaskViewType.MyBusinesses;
    // this._defaultViewType = TaskViewType.MyBusinesses;
    // this._businessViewDueFilter = '';
    // this._businessStatusFIlter = [{ name: 'In Progress', id: TaskStatus.InProgress }, { name: 'To Do', id: TaskStatus.ToDo }];
    // this._dataSouceType = AeDatasourceType.Local;
    //Drop down data
    // this._viewTypeOptions = Immutable.List([new AeSelectItem<TaskViewType>('My Businesses', TaskViewType.MyBusinesses, false), new AeSelectItem<TaskViewType>('Businesses I have assigned to others', TaskViewType.AssignedToOthers, false)]);
    // this._priorityOptions = [{ name: 'Immediate', id: Priority.Immediate }, { name: 'High', id: Priority.High }, { name: 'Medium', id: Priority.Medium }, { name: 'Low', id: Priority.Low }];
    // this._statusOptions = [{ name: 'Complete', id: TaskStatus.Complete }, { name: 'In Progress', id: TaskStatus.InProgress }, { name: 'To Do', id: TaskStatus.ToDo }];
    // this._dueFilterOptions = Immutable.List([new AeSelectItem<string>('All', '', false), new AeSelectItem<string>('New businesses', '11', false), new AeSelectItem<string>('Overdue businesses', '12', false), new AeSelectItem<string>('Incomplete businesses', '13', false), new AeSelectItem<string>('Due today', '14', false), new AeSelectItem<string>('Due this week', '15', false), new AeSelectItem<string>('Due next week', '16', false)]);
    //End of drop data


    //Setting default filters
    this._filters = new Map<string, string>();
    // this._filters.set('filterTaskView', TaskViewType.MyBusinesses.toString());
    // this._filters.set('filterTaskStatus', TaskStatus.ToDo.toString() + ',' + TaskStatus.InProgress.toString());
    //this._filters.set('TaskPriorityFilter', '');
    //this._filters.set('filterBusinessesByDeadLine', this._businessViewDueFilter);
    //this._filters.set('filterTaskCategory', 'All');
    this._filters.set('coursebyname', 'photo');

    //End of default filters

    this._businesses = new BehaviorSubject(Immutable.List<BusinessView>([]));


    // //Action buttons
    // this._actions = Immutable.List([
    //   new AeDataTableAction("To do", this._todoActionCommand, false),
    //   new AeDataTableAction("In progress", this._inProgressActionCommand, false),
    //   new AeDataTableAction("Complete", this._completeActionCommand, false),
    //   new AeDataTableAction("Update", this._updateTaskCommand, false),
    //   new AeDataTableAction("Remove", this._removeTaskCommand, false)
    // ]);
    //End of action buittons


  }
  // End of constructor



  ngOnInit(): void {
    this._businessesLoading$ = this._store.let(fromRoot.getBusinessesListLoadingData);
    this._businessService._setDefaultFitlers(this._filters);
    this._businessService._loadBusinesses();
    //this._businessService.getUsersList();
    //this._businessCategoryService.getTaskCategories();

    // this._todoActionSubsription = this._todoActionCommand.subscribe(task => {
    //   task = Object.assign({}, task, { Status: TaskStatus.ToDo });
    //   this._businessService._changeTaskStatus(task as BusinessView)
    // }
    //);
    // this._inProgressActionSubsription = this._inProgressActionCommand.subscribe(task => {
    //   task = Object.assign({}, task, { Status: TaskStatus.InProgress });
    //   this._businessService._changeTaskStatus(task as BusinessView)
    // });

    // this._completeActionSubscription = this._completeActionCommand.subscribe(task => {
    //   task = Object.assign({}, task, { Status: TaskStatus.Complete });
    //   this._businessService._changeTaskStatus(task as BusinessView)
    // });

    // this._updateTaskSubscription = this._updateTaskCommand.subscribe(task => {
    //   this.isUpdate = true;
    //   let selectedTask = task as BusinessView;
    //   this._onTaskSelect(selectedTask.Id);
    // });
    // this._removeTaskSubscription = this._removeTaskCommand.subscribe(task => {
    //   if (!isNullOrUndefined(task)) {
    //     this._removableTask = task as BusinessView;
    //     this._showRemoveDialog = true;
    //   
    // });


    this.sub = this._route.params.subscribe(params => {    
       console.log(params['term']);
      //if(params['term'])
      this._filters.set('coursebyname',params['term']);
      this._businessService._loadBusinesses();

     // if(this.searchTerm)
     // this.store.dispatch(new SetSearchTermAction( params['term'] ));
    });

    this._businessListSubscription = this._store.let(fromRoot.getBusinessesListData).subscribe((businessesList) => {
      console.log("subscribe log");
      if (!isNullOrUndefined(businessesList)) {

         let entitiesList = Immutable.List<BusinessView>(businessesList.Entities);
         this._businessesList = entitiesList;
        if (businessesList.PagingInfo && businessesList.PagingInfo.PageNumber === 1) {
          this._totalRecords.next(businessesList.PagingInfo.TotalCount);
        }
        this._businesses.next(entitiesList);
        this._cdRef.markForCheck();
      }
      // this._translationService.translationChanged.subscribe(() => {
      //   this._objectType = this._translationService.translate('Task');
      // });
    });

    // this._businessCategoriesSubscription = this._store.let(fromRoot.getTaskCategoriesData).subscribe(x => {
    //   this._businessCategories = x;
    // }
    // );;

  }

  //End of life cycle hooks


  ngOnDestroy() {
    //this._todoActionSubsription.unsubscribe();
    //this._inProgressActionSubsription.unsubscribe();
    //this._completeActionSubscription.unsubscribe();
    //this._updateTaskSubscription.unsubscribe();
    //this._removeTaskSubscription.unsubscribe();
    this._businessListSubscription.unsubscribe();
    //this._businessCategoriesSubscription.unsubscribe();
    // if (!isNullOrUndefined(this._updateTaskCompleteSubscription)) {
    //   this._updateTaskCompleteSubscription.unsubscribe();
    // }

    this.sub.unsubscribe();
  }

    /**
   * method to selected task
   * @param {string} taskId 
   * 
   * @memberOf TaskListComponent
   */
  _onBusinessSelect(taskId: string) {
    this._businessService._onBusinessSelect(taskId);
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

}
