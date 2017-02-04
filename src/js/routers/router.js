var Backbone = require("../common/backboneFix.js");

var IndexView = require('../views/index.js');
var AlbumsListView = require('../views/albumsListPage.js');
var AlbumView = require('../views/albumPage.js');
var UserDataModel = require("../models/userdata.js");

var Router = Backbone.Router.extend({
    currentView: null,
    routes: {
        "user/:id/album/:album": "showAlbum",
        "user/:id": "showAlbumsList",
        "": "index"
    },
    initialize: function() {
        this.redirect = this.redirect.bind(this);

        UserDataModel.fetch();

        UserDataModel.on('change', this.redirect);
    },
    redirect: function() {
        if (this.isConnected() === true) {
            var session = UserDataModel.get('session');

            this.navigate('user/' + session.user.id, {trigger: true});
        } else {
            this.navigate('', {trigger: true, replace: true});
        }
    },
    redirectToLogin: function() {
        this.navigate('', {trigger: true, replace: true});
    },
    isConnected: function() {
        return !!UserDataModel.get('status');
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
    },
    showAlbumsList: function(id) {
        if (this.isConnected() === true) {
            this.changeView(new AlbumsListView(id));
        } else {
            this.redirectToLogin();
        }
    },
    showAlbum: function(id, album) {
        if (this.isConnected() === true) {
            this.changeView(new AlbumView(id, album));
        } else {
            this.redirectToLogin();
        }
    }
});

module.exports = Router;
