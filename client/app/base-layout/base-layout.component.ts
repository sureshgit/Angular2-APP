import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import { SearchFiltersService } from '../shared/services/searchFilters.service';


declare var jquery: any;
declare var $: any;

@Component({
    selector: 'ss-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.styles.css']
  })
  export class BaseLayoutComponent implements OnInit, OnDestroy {
    searchTerm : string;
   constructor(private router: Router,
    private route : ActivatedRoute,
    private _searchFiltersService : SearchFiltersService
    ) {

   };

   ngOnInit()
   {

   }

    showLogin() {
      $('#loginModal').modal();            
          console.log(this.route.snapshot);
    }

    search() {
      if(this.searchTerm){
       this._searchFiltersService._setSerachParam(this.searchTerm);
       this.router.navigate(['search','business','sathupally'], { queryParams : { query : this.searchTerm }});
      }
    }

    toggleHeader()
    {

      $('.header__primary').slideToggle();
    }

    ngOnDestroy(){  
      //this.sub.unsubscribe();
    }
  }

