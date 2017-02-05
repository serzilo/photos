var Backbone = require("../common/backboneFix.js");
var vkAPI = require('../common/vkAPI.js');

var UserDataModel = require("../models/userdata.js");
var AlbumsCollection = require("../collections/albums.js");

var AlbumsPage = Backbone.View.extend({
    el: $('#app'),
    template: _.template($('#albumsListPage').html()),
    errorMessageTemplate: _.template($('#errorMessage').html()),
    albumTileTemplate: _.template($('#albumTile').html()),
    initialize: function(id) {
        this.owner_id = id;
        this.renderAlbums = this.renderAlbums.bind(this);

        this.getAlbums(id);
        AlbumsCollection.on('add', this.renderAlbums);
    },
    events: {
        'click #logOut': 'logOut'
    },
    render: function() {
        this.$el.html(this.template());
        this.renderAlbums();
    },
    getAlbums: function(id) {
        var that = this;

        vkAPI
            .getAlbums(id)
            .done(function(res) {
                if (res.error) {
                    that.renderError(res.error);
                } else {
                    if (res && res.response && res.response.count > 0) {
                        AlbumsCollection.set(res.response.items);
                    } else {
                        that.renderError({ error_msg: 'Альбомов не обнаружено.'});
                    }
                }
            });
    },
    renderAlbums: function() {
        var that = this;
        var albums = AlbumsCollection.map(function(albumItem){
            var album = albumItem.toJSON();

            album.album_url = '#user/' + that.owner_id + '/album/' + album.id;

            return that.albumTileTemplate(album);
        });

        this.$('#albums').html(albums);
    },
    renderError: function(data) {
        this.$('#albums').html(this.errorMessageTemplate(data));
    },
    logOut: function (e) {
        e.preventDefault();

        UserDataModel.clear();
        UserDataModel.save();
    }
});

module.exports = AlbumsPage;
