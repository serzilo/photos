var Backbone = require("../common/backboneFix.js");

var UserPage = Backbone.View.extend({
    template: _.template($('#userPage').html()),
    render: function() {
        $('#app').html(this.$el.html(this.template()));
    }
});

module.exports = UserPage;
