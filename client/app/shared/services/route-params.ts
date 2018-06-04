import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class RouteParams {
    public Cid: string;
    public Id: string;
    public Term: string;    
    constructor(private _router: ActivatedRoute) {
        this._router.params.subscribe(params => {
            this.Id = params['id'];
        });

        this._router.queryParams.subscribe(params => {
            this.Cid = params['cid'];
        });

        this._router.queryParams.subscribe(params => {
            this.Term = params['term'];
        });
    }
}