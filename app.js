'use strict';

var express = require('express');
var wechat = require('wechat');
var List = wechat.List;
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

List.add('view', [
  ['::help:: Welcome to app! I am bot! ', function (info, req, res, next) {

  }]

  /*
  ['reply {b}', function (info, req, res, next) {
    res.reply('Im Answer B');
    res.reply('Welcome to app! I am bot, will send you hints. Command-lists: \n 1. if you are looking for apartment (seeker), use command-line,: /s:your_description_about_what_a_you_looking_for  \n 2. if you wanna find tenant, please use command-line: /a:your_description. \n 3. If you wanna add images, please send first command-line /a:imgs  ,  and then add images. \n 4. If everything well done, dont forget send last command-line /push .');
  }],
  ['reply {c}', function (info, req, res, next) {
    res.reply('Im Answer C');
    res.reply('Welcome to app! I am bot, will send you hints. Command-lists: \n 1. if you are looking for apartment (seeker), use command-line,: /s:your_description_about_what_a_you_looking_for  \n 2. if you wanna find tenant, please use command-line: /a:your_description. \n 3. If you wanna add images, please send first command-line /a:imgs  ,  and then add images. \n 4. If everything well done, dont forget send last command-line /push .');
  }]

  */
]);

var app = express();

app.use(express.query());
app.use(cookieParser());
app.use(expressSession({secret: 'somesecrettokenhere', cookie: {maxAge: 60000}}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

/*
app.use('/wechat', wechat('token', wechat.text(function (info, req, res, next) {

  console.log('info, req, res, next', info, req, res, next);

  if (info.Content === 'list') {
    res.wait('view'); // view is the very wait we setuped before.
  } else {
    res.reply('hehe');
    // or stop the waiter and quit.
    // res.nowait('hehe');
  }
})));
*/
var ad = {};
var _key;

app.use('/wechat', wechat('token').text(function (message, req, res, next) {

  console.log('message', message);

  var isKey = function(k){
    return _key === k;
  };

  var addKey = function(k){
    if (k === '/d' || k === '/l' || k === '/img' || k === '/help' || k === '/push' ) {
      return k;
    }
    return _key;
  };

  var isContent = function (content) {
    return content !== '/l' && content !== '/d' && content !== '/img' && content !== '/help' && content !== '/push' && content;
  };

  // message is located in req.weixin
  // four  typoe of messages http://mp.weixin.qq.com/wiki/home/index.html

  //access the hint with list of keys
  if (message.Content === '/help') {
    res.wait('view'); // list of commands.
  } else {
    //res.reply('hehe');
    res.nowait('You progress: ', JSON.stringify(ad));
  }


  _key = addKey(message.Content);
  console.log('_key', _key);


  if (!_key) {
    console.log('_key is undefined !');
    return;
  }

  // /d
  if (isKey('/d')){
    if (isContent(message.Content)) {

      ad.desc = ad.desc || [];
      ad.desc.push(message.Content);
      console.log('ad.desc', ad.desc);

    }
  }

  // /l
  if (isKey('/l')) {
    if (isContent(message.Content)) {

      ad.location = ad.location || [];
      ad.location.push(message.Content);
      console.log('ad.location', ad.location);

    }
  }


  if (isKey('/img')) {
    if (isContent(message.Content)) {
    }
  }

  // /img
  if (isKey('/push')) {

    console.log('post', ad);
    res.reply('This adds will be pushed into the server: ', ad);

  }



}).image(function (message, req, res, next) {
 
  ad.img = ad.img || [];
  ad.img.push(message.PicUrl);
  console.log('ad.img', ad.img);

  // TODO
}).voice(function (message, req, res, next) {
  console.log('voice', message);
  // TODO
}).video(function (message, req, res, next) {
  // TODO
}).location(function (message, req, res, next) {
  // TODO
}).link(function (message, req, res, next) {
  console.log('link', message);
  // TODO
}).event(function (message, req, res, next) {
  // TODO
}).device_text(function (message, req, res, next) {
  // TODO
}).device_event(function (message, req, res, next) {
  // TODO
}).middlewarify());



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


app.use(function(err, req, res, next) {
  console.error('err', err, err.stack);
  res.status(500).send('500 Error!');
});

