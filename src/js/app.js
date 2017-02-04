var Backbone = require("./common/backboneFix.js");

var Router = require('./routers/router.js');
var AppConfig = require('./configs/app.js');

require('./common/openapi.js');

VK.init({apiId: AppConfig.apiId});

var data = {
    init: function() {
        new Router();
        Backbone.history.start();
    }
};

module.exports = data;
