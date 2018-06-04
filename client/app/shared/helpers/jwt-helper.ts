import { isNullOrUndefined } from 'util';
export class JWTHelper {
    static isTokenExpired(token: string, offsetSeconds?: number): boolean {
        let tokenExpirationDate = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;

        if (tokenExpirationDate == null) {
            return true;
        }

        return !(tokenExpirationDate.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }

    static getTokenExpirationDate(token: string): Date {
        let decoded: any;
        decoded = this.getDataFromToken(token);

        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }

        let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    static getDataFromToken(token: string) {
        let data = {};
        if (!isNullOrUndefined(token)) {
            let encoded = token.split('.')[1];
            data = JSON.parse(this.urlBase64Decode(encoded));
        }

        return data;
    }

    static urlBase64Decode(str: string) {
        let output = str.replace('-', '+').replace('_', '/');
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
}