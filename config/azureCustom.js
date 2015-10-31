var azureConfig = require('./azureConfig.js');

module.exports = function (azure) {

    this.uploadBlobFromStream = function() {
        azure._createBlobFromStream()
    }


};