import { JWTHelper } from '../helpers/jwt-helper';
import { Router } from '@angular/router';
import { Identity } from '../models/identity';
import { Action, Store } from '@ngrx/store';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { defer } from 'rxjs/observable/defer';
import { Effect, Actions } from '@ngrx/effects';
import * as authorizationActions from '../actions/identity.actions';
import * as fromRoot from '../reducers';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthorizationEffects {
    constructor(private _actions$: Actions, private _storage: StorageService
        , private _store: Store<fromRoot.State>
        , private _router: Router
        , private _cookieService: CookieService
    ) {

    }

    @Effect({ dispatch: false })
    rehydrateState$ = defer(() => {
        let identity = this._storage.get<Identity>('identity');
        this._store.dispatch(new authorizationActions.SetInitialStateAction(identity));
    });

    @Effect({ dispatch: false })
    setNonce$: Observable<boolean> = this._actions$.ofType(authorizationActions.ActionTypes.SET_OAUTH_NONCE)
        .map((action: authorizationActions.SetOAuthNonceAction) => this._storage.set('identity', action.payload))

    @Effect({ dispatch: false })
    resetAuth$: Observable<boolean> = this._actions$.ofType(authorizationActions.ActionTypes.RESET_AUTH_DATA)
        .map((action: authorizationActions.ResetOAuthDataAction) => {
            this._storage.remove('identity');
            this._cookieService.remove('token');
            return true;
        })

    @Effect({ dispatch: false })
    setToken$: Observable<boolean> = this._actions$.ofType(authorizationActions.ActionTypes.SET_OAUTH_TOKEN)
        .map((action: authorizationActions.SetOAuthTokenAction) => {
            var result = this._storage.set('identity', action.payload);
            this._cookieService.put("token", action.payload.token, { expires: JWTHelper.getTokenExpirationDate(action.payload.token) });

            if (action.payload.url) {
                this._router.navigate([action.payload.url]);
            }
            return result;
        })

}