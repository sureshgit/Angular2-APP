import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";
import { LoaderService } from '../shared/services/navigate-loader.service';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

	private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

	constructor(private route: ActivatedRoute,
     private router: Router,
     private location: Location, 
     private nLoader : LoaderService, 
     private _cdRef: ChangeDetectorRef){

	}
	ngOnInit(){
	

	}

    ngAfterViewInit(){
        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        
        this.router.events.subscribe((ev: any) => {
            if (ev instanceof NavigationStart) {
            console.log('started');
                this.nLoader.show();
                if (ev.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);

            } else if (ev instanceof NavigationEnd) {
                if (ev.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            console.log('Ended');
            this.nLoader.hide();
            }
            //this._cdRef.markForCheck();
        });

    }
}
