import { Subject } from 'rxjs/Rx';
import { BusinessView } from '../models/bisiness';
import {
    ChangeBusinessAction,
    LoadSelectedBusinessAction,
    LoadBusinessesAction,
    RemoveBusinessAction,
    SetDefaultFiltersAction
} from '../actions/business-list.action';
//import * as addAction from '../actions/business-add.actions';
import { Store } from '@ngrx/store';
import { Injectable, OnInit } from '@angular/core';
import * as fromRoot from '../../shared/reducers/index';

@Injectable()
export class BusinessService implements OnInit {
    // Private Fields
    // End of Private Fields

    // Public properties
    // End of Public properties

    // constructor
    constructor(private _store: Store<fromRoot.State>) {

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
    _loadBusinesses() {
        this._store.dispatch(new LoadBusinessesAction(true));
    }

    // Private methods

    // /**
    //  * to dispatch event to populate user autocomplete list
    //  * 
    //  * @memberOf BusinessService
    //  */
    // _populateUserAutocompleteList() {
    //     // this._store.dispatch(new LoadBusinessesAction(true));
    //     this._store.dispatch(new addAction.LoadAssignUsers(true));
    // }

    // Private methods

    /**
     * to dispatch event to add new business
     * 
     * @memberOf BusinessService
     */
    // _addNewBusiness(businessFormObj) {
    //     // this._store.dispatch(new LoadBusinessesAction(true));
    //     this._store.dispatch(new addAction.SaveBusinessAction(businessFormObj));
    // }

    /**
     * to dispatch event to select the business
     * @param {string} businessId 
     * 
     * @memberOf BusinessService
     */
    _onBusinessSelect(businessId: string) {
        this._store.dispatch(new LoadSelectedBusinessAction(businessId));
    }

    /**
     * to dispatch event to change the business status
     * @param {BusinessView} businessView 
     * 
     * @memberOf BusinessService
     */
    _changeBusinessStatus(businessView: BusinessView) {
        this._store.dispatch(new ChangeBusinessAction(businessView));
    }

    /**
     * to dispatch event to remove the business
     * @param {BusinessView} businessView 
     * 
     * @memberOf BusinessService
     */
    _removeBusiness(businessView: BusinessView) {
        this._store.dispatch(new RemoveBusinessAction(businessView));
    }

    /**
     * to dispatch event to set default filters
     * @param {Map<string, string>} filters 
     * 
     * @memberOf BusinessService
     */
    _setDefaultFitlers(filters: Map<string, string>) {
        this._store.dispatch(new SetDefaultFiltersAction(filters));
    }

    // /**
    //  * method to return the business status
    //  * @param {number} status 
    //  * @returns 
    //  * 
    //  * @memberOf BusinessService
    //  */
    // _getStatus(status: number) {
    //     switch (status) {
    //         case BusinessStatus.Complete:
    //             return "Complete";
    //         case BusinessStatus.InProgress:
    //             return "In progress";
    //         case BusinessStatus.ToDo:
    //             return "To do";
    //     }
    // }

    // /**
    //     * method to return the business prority text
    //     * @param {number} priority 
    //     * @returns 
    //     * 
    //     * @memberOf BusinessService
    //     */
    // _getPriority(priority: number) {
    //     switch (priority) {
    //         case Priority.Immediate:
    //             return "Immediate";
    //         case Priority.High:
    //             return "High";
    //         case Priority.Medium:
    //             return "Medium";
    //         case Priority.Low:
    //             return "Low";
    //     }
    // }

    // /**
    //  * method to check the whether business is immediate priority
    //  * @param {number} priority 
    //  * @returns 
    //  * 
    //  * @memberOf BusinessService
    //  */
    // _isImmediatePriorityBusiness(priority: number) {
    //     return priority == Priority.Immediate;
    // }

    // /**
    //  * method to check the whether business is High priority
    //  * @param {number} priority 
    //  * @returns 
    //  * 
    //  * @memberOf BusinessService
    //  */
    // _isHighPriorityBusiness(priority: number) {
    //     return priority == Priority.High;
    // }

    // /**
    //  * method to check the whether business is Medium priority
    //  * @param {number} priority 
    //  * @returns 
    //  * 
    //  * @memberOf BusinessService
    //  */
    // _isMediumPriorityBusiness(priority: number) {
    //     return priority == Priority.Medium;
    // }

    // /**
    //  * method to check the whether business is Low priority
    //  * @param {number} priority 
    //  * @returns 
    //  * 
    //  * @memberOf BusinessService
    //  */
    // _isLowPriorityBusiness(priority: number) {
    //     return priority == Priority.Low;
    // }

    // getUsersList(): void {
    //     this._store.dispatch(new LoadAssignUsers(true));
    // }
    // End of private methods

    // Public methods
    // End of public methods

}