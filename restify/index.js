var restify = require('restify');

var bulb = {
  on: false,
  color: {r: 255, g: 255, b: 255},
  brightness: 1
}

function toggle(req, res, next) {
  bulb.on = !bulb.on;
  res.send(bulb.on);
  return next();
};

function turnOn(req, res, next) {
  bulb.on = true;
  res.send(bulb.on);
  return next();
}

function turnOff(req, res, next) {
  bulb.on = false;
  res.send(bulb.on);
  return next();
}

function isOn(req, res, next) {
  res.send(bulb.on);
  return next();
}

function getColor(req, res, next) {
  res.send(bulb.color);
  return next();
}

function setColor(req, res, next) {
  bulb.color = req.body;
  res.send(bulb.color);
  return next();
}


function getBrightness(req, res, next) {
  res.send(bulb.brightness);
  return next();
}

function setBrightness(req, res, next) {
  bulb.brightness = req.body.brightness;
  res.send(bulb.brightness);
  return next();
}

function getState(req, res, next) {
  res.send(bulb);
  return next();
}

function setState(req, res, next) {
  bulb = req.body;
  res.send(bulb);
  return next();
}

var server = restify.createServer();
server.use(restify.bodyParser());

server.use(function (req, res, next) {
  res.setHeader('matchedVersion', req.matchedVersion());
  return next();
});

server.get({path: '/isOn', version: ['1.0.0','1.1.0-A','2.0.0-A']}, isOn);
server.post({path: '/turnOn', version: ['1.0.0','1.1.0-A']}, turnOn);
server.post({path: '/turnOff', version: ['1.0.0','1.1.0-A']}, turnOff);

server.get({path: '/color', version: ['1.0.0','1.1.0-A','2.0.0-A']}, getColor);
server.post({path: '/color', version: ['1.0.0','1.1.0-A','2.0.0-A']}, setColor);

server.get({path: '/brightness', version: ['1.0.0','1.1.0-A','2.0.0-A']}, getBrightness);
server.post({path: '/brightness', version: ['1.0.0','1.1.0-A','2.0.0-A']}, setBrightness);

server.post({path: '/toggle', version: ['1.1.0-A','2.0.0-A']}, toggle);

server.get({path: '/state', version: '2.0.0-B'}, getState);
server.post({path: '/state', version: '2.0.0-B'}, setState);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
