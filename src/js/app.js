var Backbone = require('backbone');

var Router = require('./routers/router.js');

var data = {
    init: function() {
        new Router();
        Backbone.history.start();
    }
};

module.exports = data;
