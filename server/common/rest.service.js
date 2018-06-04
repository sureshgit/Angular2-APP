const config = require('./../config');
const https = require('https');

function get(token, path) {
    if (config.devMode) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }
    let data = '';
    return new Promise((fulfill, reject) => {
        https.get({
            host: config.apiUrlHost,
            port: config.apiUrlPort,
            path: '/api/' + path,
            headers: { 'authorization': 'Bearer ' + token }
        },
            (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    // console.log(chunk);
                    data = data + chunk;
                });

                res.on('end', () => { 
                    //console.log(data);
                    fulfill(data) ;
                });

                res.on('error', (err) => reject(err));
            }
        )
    });
}

module.exports = {
    get
}