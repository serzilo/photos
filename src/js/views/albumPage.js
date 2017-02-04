var Backbone = require("../common/backboneFix.js");

var UserDataModel = require("../models/userdata.js");
var PhotosCollection = require("../collections/photos.js");

var AppConfig = require('../configs/app.js');

var AlbumPage = Backbone.View.extend({
    el: $('#app'),
    template: _.template($('#photosPage').html()),
    photoTileTemplate: _.template($('#photoTile').html()),
    popupTemplate: _.template($('#popup').html()),
    initialize: function(id, album) {
        PhotosCollection.reset();
        this.renderPhotos = this.renderPhotos.bind(this);

        this.backLinkUrl = '#user/' + id;

        this.getPhotos(id, album);

        PhotosCollection.on('add', this.renderPhotos);
    },
    events: {
        'click #logOut': 'logOut',
        'click .js-photo-tile': 'openPopup',
        'click #closePopupBtn': 'closePopup',
        'click #popupOverlay': 'closePopup'
    },
    render: function() {
        this.$el.html(this.template({ backLinkUrl: this.backLinkUrl }));
        this.renderPhotos();
    },
    getPhotos: function(id, album) {
        $.ajax({
            url: "https://api.vk.com/method/photos.get?v=5.62&owner_id=" + id + "&album_id=" + album + "&count=" + AppConfig.countImagesInAlbum,
            dataType: 'jsonp'
        }).done(function(res) {
            if (res.response.count > 0) {
                PhotosCollection.set(res.response.items);
            }
        });
    },
    renderPhotos: function() {
        var that = this;
        var photos = PhotosCollection.map(function(photo){
            return that.photoTileTemplate(photo.toJSON());
        });

        this.$('#photos').html(photos);
    },
    logOut: function (e) {
        e.preventDefault();

        UserDataModel.clear();
    },
    openPopup: function(e) {
        e.preventDefault();

        var element = e.currentTarget;
        var url = element.getAttribute('data-photo');
        var description = element.getAttribute('data-text');

        this.$('#popupPlace').html(this.popupTemplate({ url: url, description: description }));
    },
    closePopup: function(e) {
        e.preventDefault();

        this.$('#popupPlace').html('');
    }
});

module.exports = AlbumPage;
