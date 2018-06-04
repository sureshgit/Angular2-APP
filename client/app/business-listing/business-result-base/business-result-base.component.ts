import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Store} from '@ngrx/store';

// import  {
// SetSearchTermAction
// } from '../../shared/actions/search.action';

//import { State } from '../../shared/reducers/appState';

declare var $ :any;
declare var jquery :any;

@Component({
  selector: 'ss-business-result-base',
  templateUrl: './business-result-base.component.html',
  styleUrls: ['./business-result-base.component.css']
})
export class BusinessResultBaseComponent implements OnInit, OnDestroy {

  // constructor(private route: ActivatedRoute, private store: Store<State>) { }
  constructor(private route: ActivatedRoute) { }
  private sub:any;
  searchTerm :string;
  ngOnInit() {

  	   //this.sub = this.route.params.subscribe(params => {
       //this.searchTerm = params['term'];
       //console.log(params['term']);
       // In a real app: dispatch action to load the details here.
	   //if(this.searchTerm)
	   //this.store.dispatch(new SetSearchTermAction( params['term'] ));
    //});
  }

  ngOnDestroy()
  {
  	//this.sub.unsubscribe();
  }

}
