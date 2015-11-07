var express = require('express');
var wechat = require('wechat');
var List = wechat.List;
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

List.add('view', [
  ['reply {a}', function (info, req, res, next) {
    res.reply('Im Answer A');
    res.reply('Welcome to app! I am bot, will send you hints. Command-lists: \n 1. if you are looking for apartment (seeker), use command-line,: /s:your_description_about_what_a_you_looking_for  \n 2. if you wanna find tenant, please use command-line: /a:your_description. \n 3. If you wanna add images, please send first command-line /a:imgs  ,  and then add images. \n 4. If everything well done, dont forget send last command-line /push .');

  }],
  ['reply {b}', function (info, req, res, next) {
    res.reply('Im Answer B');
    res.reply('Welcome to app! I am bot, will send you hints. Command-lists: \n 1. if you are looking for apartment (seeker), use command-line,: /s:your_description_about_what_a_you_looking_for  \n 2. if you wanna find tenant, please use command-line: /a:your_description. \n 3. If you wanna add images, please send first command-line /a:imgs  ,  and then add images. \n 4. If everything well done, dont forget send last command-line /push .');
  }],
  ['reply {c}', function (info, req, res, next) {
    res.reply('Im Answer C');
    res.reply('Welcome to app! I am bot, will send you hints. Command-lists: \n 1. if you are looking for apartment (seeker), use command-line,: /s:your_description_about_what_a_you_looking_for  \n 2. if you wanna find tenant, please use command-line: /a:your_description. \n 3. If you wanna add images, please send first command-line /a:imgs  ,  and then add images. \n 4. If everything well done, dont forget send last command-line /push .');
  }]
]);

var app = express();

app.use(express.query());
app.use(cookieParser());
app.use(expressSession({secret: 'somesecrettokenhere', cookie: {maxAge: 60000}}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/wechat', wechat('token', wechat.text(function (info, req, res, next) {
  if (info.Content === 'list') {
    res.wait('view'); // view is the very waiter we setuped before.
  } else {
    res.reply('hehe');
    // or stop the waiter and quit.
    // res.nowait('hehe');
  }
})));

/*

app.use('/wechat',   wechat('token').text(function (message, req, res, next) {
  // TODO

  // message is located in req.weixin
  // four  typoe of messages http://mp.weixin.qq.com/wiki/home/index.html
  console.log('message.Content' ,message.Content);

  if (message.Content === 'list') {
    res.wait('view'); // view is the very waiter we setuped before.
  } else {
    console.log('1111')
    //res.reply('hehe');
    // res.nowait('hehe');
  }


  console.log('text', message);

    // seeker
    if (message.Content === '/s:'){

    }

    //aprt
    if (message.Content === '/a:') {

    }

    //aprt:images
    if (message.Content === '/a:imgs') {

    }

    //done
    if (message.Content === '/push') {
    //push request to server

      res.reply('This adds will be pushed onto the server!');
    }


}).image(function (message, req, res, next) {
  console.log('image', message);
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



*/

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


app.use(function(err, req, res, next) {
  console.error('err', err, err.stack);
  res.status(500).send('Something broke!');
});

