import { AuthConfig, IAuthConfig } from './auth-config';
import {
    RefreshTokenAction,
    ResetOAuthDataAction,
    SetOAuthNonceAction,
    SetOAuthTokenAction
} from '../actions/identity.actions';
import { Identity } from '../models/identity';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs/Rx';
import { Headers, Request, Http, RequestMethod, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import * as fromRoot from '../reducers/index';
import * as fromConstants from '../app.constants';
import { AuthorizationEffects } from "./../effects/authorization.effects";
import { JWTHelper } from '../helpers/jwt-helper';

@Injectable()
export class AuthorizationService {

    // Private fields
    private _userIdentity$: Observable<Identity>;
    private _userIdentity: Identity;
    private _config: IAuthConfig;
    private _headers: Headers;
    private _appUrl: string;
    private _stsUrl: string;
    // End of Private fields

    // Constructor
    constructor(private _http: Http, private _router: Router, private _store: Store<fromRoot.State>, private _authConfig: AuthConfig, private _authAfftects: AuthorizationEffects) {
        this._appUrl = fromConstants.appUrl;
        this._stsUrl = fromConstants.stsURL;
        this._config = _authConfig.getConfig();

        this._userIdentity$ = this._store.let(fromRoot.getUserIdentity);
        this._userIdentity$.subscribe(userIdentity => {
            this._userIdentity = userIdentity;
        });
    }
    // End of Constructor

    // Private methods
    private getUserData = (): Observable<string[]> => {
        this.setHeaders();
        return this._http.get(this._stsUrl + '/connect/userinfo', {
            headers: this._headers,
            body: ''
        }).map(res => res.json());
    }

    private setHeaders(token: string = null) {
        this._headers = new Headers;
        if (!this._config.globalHeaders) {
            this._config.globalHeaders.forEach((header: Object) => {
                let key: string = Object.keys(header)[0];
                let headerValue: string = (header as any)[key];
                this._headers.set(key, headerValue);
            });
        }

        if (!token) {
            token = this.GetToken();
        }

        if (token !== '') {
            this._headers.append('Authorization', 'Bearer ' + token);
        }
    }

    private refreshTokenSetter(res: any) {
        res = res.json();

        if (!res || !res[this._config.refreshTokenName] || !res[this._config.tokenName]) {
            this.ResetAuthorizationData();

            return false;
        }
        this.SetAuthorizationData(res[this._config.tokenName], res[this._config.refreshTokenName])

        return true;
    }
    // End of Private methods

    // Public methods
    public IsAuthorized(): boolean {
        return true;
        //TODO: Make it work
        // if (this._userIdentity && this._userIdentity.token) {
        //     if (JWTHelper.isTokenExpired(this._userIdentity.token)) {
        //         this.ResetAuthorizationData();
        //         return false;
        //     }

        //     return true;
        // }

        // return false;
    }

    public ResetAuthorizationData() {
        this._store.dispatch(new ResetOAuthDataAction(true));
    }

    public Authorize(url: string) {
        this.ResetAuthorizationData();

        let authorizationUrl = this._stsUrl + '/identity/connect/authorize';
        let client_id = 'atlas2angularwebapp';
        let redirect_uri = this._appUrl + '/authcallback';
        let response_type = "id_token token";
        let scope = "atlascore openid";
        let nonce = "N" + Math.random() + "" + Date.now();
        let state = Date.now() + "" + Math.random();

        this._store.dispatch(new SetOAuthNonceAction(new Identity(null, null, nonce, state, url)));

        var url =
            authorizationUrl + "?" +
            "response_type=" + encodeURI(response_type) + "&" +
            "client_id=" + encodeURI(client_id) + "&" +
            "redirect_uri=" + encodeURI(redirect_uri) + "&" +
            "scope=" + encodeURI(scope) + "&" +
            "nonce=" + encodeURI(nonce) + "&" +
            "state=" + encodeURI(state);

        window.location.href = url;
    }

    public SetAuthorizationData(token: any, id_token: any, url: string = null) {
        this._store.dispatch(new SetOAuthTokenAction(new Identity(token, id_token, null, null, url)));
        // debugger;
        // document.cookie = "username=John";
    }

    public AuthorizedCallback() {
        let hash = window.location.hash.substr(1);

        let result: any = hash.split('&').reduce(function (result: any, item: string) {
            let parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});

        let token = '';
        let id_token = '';
        let authResponseIsValid = false;

        if (!result.error) {
            if (result.state !== this._userIdentity.state) {
                console.log('AuthorizedCallback incorrect state');
            } else {

                token = result.access_token;
                id_token = result.id_token;

                let dataIdToken: any = JWTHelper.getDataFromToken(id_token);

                // validate nonce
                if (dataIdToken.nonce !== this._userIdentity.nonce) {
                    console.log('AuthorizedCallback incorrect nonce');
                } else {
                    this.ResetAuthorizationData()

                    authResponseIsValid = true;
                }
            }
        }

        if (authResponseIsValid) {
            this.SetAuthorizationData(token, id_token, this._userIdentity.url);

            // Navigate
            //this._router.navigate([this._userIdentity.url]);
        } else {
            this.ResetAuthorizationData();
            this._router.navigate(['/Unauthorized']);
        }
    }

    public GetToken(): any {
        return this._userIdentity.token;
    }

    public SignOut() {
        let authorizationUrl = this._stsUrl + '/identity/connect/endsession';

        let id_token_hint = this._userIdentity.idToken;
        let post_logout_redirect_uri = this._appUrl;

        let url =
            authorizationUrl + '?' +
            'id_token_hint=' + encodeURI(id_token_hint) + '&' +
            'post_logout_redirect_uri=' + encodeURI(post_logout_redirect_uri);

        this.ResetAuthorizationData();

        window.location.href = url;
    }

    public refreshTheToken() {
        return Observable.of('1234567890');

        // if (!this._userIdentity.token || !JWTHelper.isTokenExpired(this._userIdentity.token)) {
        //     return Observable.of(this._userIdentity.token);
        // }

        // // if is refreshing token, wait next false value
        // if (this._userIdentity.isRefreshing) {
        //     return Observable.create((observer: Observer<void>) => {
        //         this._userIdentity$
        //             .subscribe((identity) => {
        //                 if (!identity.isRefreshing) {
        //                     observer.next(null);
        //                     observer.complete();
        //                 }
        //             });
        //     });
        // } else {
        //     return this._refreshTheToken();
        // }
    }

    private setRefreshing(value: boolean) {
        this._store.dispatch(new RefreshTokenAction(value));
    }

    private _refreshTheToken() {
        this.setRefreshing(true);

        let refreshToken: string = this._userIdentity.idToken;
        let request;

        this.setHeaders(refreshToken);
        let options = new RequestOptions({
            body: {},
            method: RequestMethod.Post,
            url: this._stsUrl + '/identity/connect/authorize',
            headers: this._headers
        });

        let req = new Request(options);
        request = this._http.request(req);


        return request
            .flatMap((res: any) => {
                debugger;
                const tokenSetter = () => this.refreshTokenSetter(res);
                const onError = Observable.throw('Impossible to get new token');

                if (tokenSetter instanceof Promise) {
                    return Observable
                        .fromPromise(tokenSetter)
                        .catch(() => {

                            this.setRefreshing(false);
                            debugger;
                            //this.emitRefreshToken();

                            return onError;
                        })
                        .concatMap(() => Observable.of(res));
                }

                if (!tokenSetter) {
                    return onError;
                }

                return Observable.of(res);
            })
            .concatMap((res) => {
                this.setRefreshing(false);
                //this.emitRefreshToken();
                debugger;   
                return Observable.of(res);
            });
    }
    // End of Public methods
}