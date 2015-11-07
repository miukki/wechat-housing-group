var config = require("./config.json");

var API = require('wechat').API;
var api = new API(config.appid, config.secret);

module.exports = api;