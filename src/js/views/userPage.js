var Backbone = require("../common/backboneFix.js");

var UserDataModel = require("../models/userdata.js");

var UserPage = Backbone.View.extend({
    template: _.template($('#userPage').html()),
    render: function() {
        $('#app').html(this.$el.html(this.template(UserDataModel.get('session').user)));
    }
});

module.exports = UserPage;
