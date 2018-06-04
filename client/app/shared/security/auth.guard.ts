import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private _authorizationService: AuthorizationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(environment.nonauth){
            return true;
        }
        if (this._authorizationService.IsAuthorized()) {
            return true;
        }

        this._authorizationService.Authorize(state.url);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(environment.nonauth){
            return true;
        }
        if (this._authorizationService.IsAuthorized()) {
            return true;
        }

        this._authorizationService.Authorize(state.url);
        return false;
    }
}