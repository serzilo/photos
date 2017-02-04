var Backbone = require("backbone");
var $ = require('jquery');
var _ = require("underscore");
var LocalStorage = require("backbone.localstorage");

Backbone.$ = $;
Backbone.LocalStorage = LocalStorage;

window.$ = $;
window._ = _;

module.exports = Backbone;
