const { createBlobService } = require('azure-storage');
const config = require('./../config');
const { through } = require('./through.stream');
const Buffer = require('buffer').Buffer;

function getBlobStream(container, identifier) {
    return new Promise((fulfill, reject) => {
        const blobService = createBlobService(config.connectionString);
        const outputStream = through();
        let buffer = [];
        outputStream.on('data', (data) => {
            buffer.push(data);
        })

        blobService.getBlobToStream(container, identifier, outputStream, (error, result, response) => {
            if (!error) {
                return fulfill(Buffer.concat(buffer));
            }
            else {
                return reject(error);
            }
        });
    });
}

module.exports = {
    getBlobStream
}
