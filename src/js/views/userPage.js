var Backbone = require("../common/backboneFix.js");

var userPage = Backbone.View.extend({
    template: _.template($('#loginPage').html()),
    render: function() {
        $('#app').html(this.$el.html(this.template()));
    }
});

module.exports = userPage;