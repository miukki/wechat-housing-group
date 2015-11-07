var api = require('./api'); //play with API

var User = function (openid) {
    this.openid = openid;
};


User.prototype.getUser = function (cb) {
    return api.getUser(this.openid, cb);
};

module.exports = User;