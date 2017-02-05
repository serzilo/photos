var AppConfig = require('../configs/app.js');

var vkAPI = {
    getPhotos: function(id, album) {
        return $.ajax({
            url: "https://api.vk.com/method/photos.get?v=5.62&owner_id=" + id + "&album_id=" + album + "&count=" + AppConfig.countImagesInAlbum,
            dataType: 'jsonp'
        })
    },
    getAlbums: function(id) {
        return $.ajax({
            url: "https://api.vk.com/method/photos.getAlbums?v=5.62&need_covers=1&need_system=1&owner_id=" + id,
            dataType: 'jsonp'
        })
    }
};

module.exports = vkAPI;
