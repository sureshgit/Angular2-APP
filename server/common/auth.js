const Config = require('./config')
// Private functions
function _isTokenExpired(token, offsetSeconds) {
    var tokenExpirationDate = _getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (tokenExpirationDate == null) {
        return true;
    }

    return !(tokenExpirationDate.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
}

function _getTokenExpirationDate(token) {
    var decoded;
    decoded = _getDataFromToken(token);

    if (!decoded.hasOwnProperty('exp')) {
        return null;
    }

    var date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
}

function _getDataFromToken(token) {
    var data = {};
    if (!isNullOrUndefined(token)) {
        var encoded = token.split('.')[1];
        data = JSON.parse(this.urlBase64Decode(encoded));
    }

    return data;
}

function urlBase64Decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }

    return window.atob(output);
}

// End private functions

function IsAuthorized(state) {
    if (state.authData && state.authData.idToken) {
        if (_isTokenExpired(authData.idToken)) {
            //this.ResetAuthorizationData();
            return false;
        }

        return true;
    }

    return false;
}

function Authorize(request, reply) {
    // this.ResetAuthorizationData();

    var authorizationUrl = Config.stsURL + '/identity/connect/authorize';
    var client_id = 'atlas2angularwebapp';
    var redirect_uri = Config.appUrl + '/authcallback';
    var response_type = "id_token token";
    var scope = "atlascore openid";
    var nonce = "N" + Math.random() + "" + Date.now();
    var state = Date.now() + "" + Math.random();

    // this._store.dispatch(new SetOAuthNonceAction(new Identity(null, null, nonce, state, url)));

    var url =
        authorizationUrl + "?" +
        "response_type=" + encodeURI(response_type) + "&" +
        "client_id=" + encodeURI(client_id) + "&" +
        "redirect_uri=" + encodeURI(redirect_uri) + "&" +
        "scope=" + encodeURI(scope) + "&" +
        "nonce=" + encodeURI(nonce) + "&" +
        "state=" + encodeURI(state);

    return reply.redirect(url).state('authData', { nonce: nonce, state: state });
}

//     public SetAuthorizationData(token: any, id_token: any) {
//     this._store.dispatch(new SetOAuthTokenAction(new Identity(token, id_token, null, null, null)));
// }

function AuthorizedCallback() {
    var hash = window.location.hash.substr(1);

    var result = hash.split('&').reduce(function (result, item) {
        let parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});

    var token = '';
    var id_token = '';
    var authResponseIsValid = false;

    if (!result.error) {
        if (result.state !== this._userIdentity.state) {
            console.log('AuthorizedCallback incorrect state');
        } else {

            token = result.access_token;
            id_token = result.id_token;

            var dataIdToken = JWTHelper.getDataFromToken(id_token);

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
        this.SetAuthorizationData(token, id_token);

        // Navigate
        this._router.navigate([this._userIdentity.url]);
    } else {
        this.ResetAuthorizationData();
        this._router.navigate(['/Unauthorized']);
    }
}

module.exports = {
    Authorize,
    IsAuthorized,
    AuthorizedCallback
}