var Backbone = require("../common/backboneFix.js");

var PhotosCollection = require("../collections/photos.js");

var AlbumPage = Backbone.View.extend({
    el: $('#app'),
    template: _.template($('#photosPage').html()),
    photoTileTemplate: _.template($('#photoTile').html()),
    initialize: function(id, album) {
        this.renderPhotos = this.renderPhotos.bind(this);

        this.getPhotos(id, album);
        this.renderPhotos();

        PhotosCollection.on('add', this.renderPhotos);
    },
    render: function() {
        this.$el.html(this.template());
    },
    getPhotos: function(id, album) {
        $.ajax({
            url: "https://api.vk.com/method/photos.get?v=5.62&owner_id=" + id + "&album_id=" + album + "&count=50",
            dataType: 'jsonp'
        }).done(function(res) {
            console.log(res);

            if (res.response.count > 0) {
                PhotosCollection.set(res.response.items);
            }
            console.dir(PhotosCollection)
        });
    },
    renderPhotos: function() {
        var that = this;
        var photos = PhotosCollection.map(function(photo){
            var photo = photo.toJSON();

            return that.photoTileTemplate(photo);
        });

        this.$el.find('#photos').html(photos);
    }
});

module.exports = AlbumPage;
