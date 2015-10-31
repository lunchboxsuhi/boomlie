var az = require('azure');

module.exports = {
    blobId: 'boomlieimages',
    containerKey: 'N+vTMgiekSk8aX0zUXMN21l0fo1pbCepE5DtE7Kz8pNPBmvZDeKL+rIbtCeiBlX/iWD56WHKH3vKpKEfA5KJIA==',
    containerProfileId: 'imagecontainer',
    containerThumbId: 'thumbcontainer',

    blobService: function() {
      return az.createBlobService('boomlieimages','N+vTMgiekSk8aX0zUXMN21l0fo1pbCepE5DtE7Kz8pNPBmvZDeKL+rIbtCeiBlX/iWD56WHKH3vKpKEfA5KJIA==');
    }
};