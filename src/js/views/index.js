var Backbone = require("../common/backboneFix.js");
var UserDataModel = require("../models/userdata.js");
var AppConfig = require('../configs/app.js');

var IndexView = Backbone.View.extend({
    template: _.template($('#loginPage').html()),
    events: {
        'click #signInBtn': 'signIn'
    },
    render: function() {
        $('#app').html(this.$el.html(this.template()));
    },
    signIn: function(e) {
        e.preventDefault();

        VK.Auth.login(this.authInfo, AppConfig.appPermissions);
    },
    authInfo: function(res) {
        if(res.session){
            UserDataModel.set(res);
        }else {
            console.error("Авторизоваться не удалось! ", res);
        }
    }
});

module.exports = IndexView;
