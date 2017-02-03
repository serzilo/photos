var Backbone = require("../common/backboneFix.js");

var IndexView = require('../views/index.js');
var UserPageView = require('../views/userPage.js');
var AlbumView = require('../views/albumPage.js');
var UserDataModel = require("../models/userdata.js");

var Router = Backbone.Router.extend({
    currentView: null,
    routes: {
        "user/:id/album/:album": "showAlbum",
        "user/:id": "user",
        "": "index"
    },
    initialize: function() {
        this.redirect = this.redirect.bind(this);

        this.redirect();

        UserDataModel.on('change', this.redirect);
    },
    redirect: function() {
        var status = UserDataModel.get('status');
        var session = UserDataModel.get('session');

        console.dir(UserDataModel);

        if ( status && status === 'connected' ) {
            this.navigate('user/' + session.user.id, {trigger: true});
        } else {
            this.navigate('/', {trigger: true, replace: true});
        }
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
    },
    showAlbum: function(id, album) {
        this.changeView(new AlbumView(id, album));

        console.log('album page');
    }
});

module.exports = Router;
