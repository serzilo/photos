var Backbone = require("../common/backboneFix.js");

var UserData = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("UserData")
});

module.exports = new UserData({ id: 1 });
