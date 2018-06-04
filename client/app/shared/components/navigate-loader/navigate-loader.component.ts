import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from '../../services/navigate-loader.service';
import { LoaderState } from '../../models/navigate-loader';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';

@Component({
    selector: 'nav-loader',
    templateUrl: 'navigate-loader.component.html',
    styleUrls: ['navigate-loader.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, AfterViewInit {

    public show : Subject<boolean> = new BehaviorSubject(false);

    private subscription: Subscription;

    constructor(
        private loaderService: LoaderService,
        private _cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() { 
        
    }

    ngAfterViewInit(){
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show.next(state.show); 
                this._cdRef.markForCheck();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}