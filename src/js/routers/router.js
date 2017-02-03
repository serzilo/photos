var Backbone = require("../common/backboneFix.js");

var IndexView = require('../views/index.js');
var UserPageView = require('../views/userPage.js');

var Router = Backbone.Router.extend({
    currentView: null,
    routes: {
        "user/:id": "user",
        "": "index"
    },
    changeView: function(view) {
        if ( null !== this.currentView ) {
            this.currentView.undelegateEvents();
        }
        this.currentView = view;
        this.currentView.render();
    },
    index: function() {
        this.changeView(new IndexView());
        console.log('index page');
    },
    user: function(id) {
        this.changeView(new UserPageView(id));
        console.log('user page');
    }
});

module.exports = Router;
