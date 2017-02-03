var Backbone = require("../common/backboneFix.js");

var UserDataModel = require("../models/userdata.js");
var AlbumsCollection = require("../collections/albums.js");

var UserPage = Backbone.View.extend({
    el: $('#app'),
    template: _.template($('#userPage').html()),
    photoTileTemplate: _.template($('#photoTile').html()),
    albumTileTemplate: _.template($('#albumTile').html()),
    initialize: function(id) {
        this.owner_id = id;

        this.renderAlbums = this.renderAlbums.bind(this);
        this.getAlbums = this.getAlbums.bind(this);

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
        $.ajax({
            url: "https://api.vk.com/method/photos.getAlbums?v=5.62&need_covers=1&owner_id=" + id,
            dataType: 'jsonp'
        }).done(function(res) {
            console.log(res);

            if (res.response.count > 0) {
                AlbumsCollection.set(res.response.items);
            }
            console.dir(AlbumsCollection)
        });
    },
    renderAlbums: function() {
        var that = this;
        var albums = AlbumsCollection.map(function(album){
            var album = album.toJSON();

            album.album_url = '#user/' + that.owner_id + '/album/' + album.id;

            console.dir(album);
            return that.albumTileTemplate(album);
        });

        this.$el.find('#albums').html(albums);
    },
    logOut: function (e) {
        e.preventDefault();

        VK.Auth.logout(function() {
            UserDataModel.clear();
        });
    }
});

module.exports = UserPage;
