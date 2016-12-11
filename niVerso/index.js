const niverso = require('niverso');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var bulb = {
  on: false,
  color: {r: 255, g: 255, b: 255},
  brightness: 1
}

(version = '1.0') => {
  function isOn(req, res): boolean {
    return bulb.on;
  };

  function turnOn(req, res): boolean  {
    bulb.on = true;
    return isOn(req, res);
  };

  function turnOff(req, res): boolean  {
    bulb.on = true;
    return isOn(req, res);
  };

  function getColor(req, res): {r: number, g: number, b: number} {
    return bulb.color;
  };

  function setColor(req, res): {r: number, g: number, b: number} {
    bulb.color = req.body;
    return getColor(req, res);
  };

  function getBrightness(req, res): number {
    return bulb.brightness;
  };

  function setBrightness(req, res): number  {
    bulb.brightness = req.body.brightness;
    return getBrightness(req, res);
  };
};

(version = '1.1-A') => {
  function toggle(req, res): {
    if (bulb.on) return turnOff(req, res);
    else return turnOn(req, res);
  };
};

(version = '2.0-B') => {
  function getState(req, res): {on: boolean, color: {r: number, g: number, b: number}, brightness: number} {
    return bulb;
  };

  function setState(req, res): {on: boolean, color: {r: number, g: number, b: number}, brightness: number} {
    bub = req.body;
    return getState(req, res);
  };
};


niverso.use(require('relation'));

niverso.get('1.0', '/isOn', (version='1.0') => isOn);
niverso.post('1.0', '/turnOn', (version='1.0') => turnOn);
niverso.post('1.0', '/turnOff', (version='1.0') => turnOff);

niverso.get('1.0', '/color', (version='1.0') => getColor);
niverso.post('1.0', '/color', (version='1.0') => setColor);

niverso.get('1.0', '/brightness', (version='1.0') => getBrightness);
niverso.post('1.0', '/brightness', (version='1.0') => setBrightness);

niverso.post('1.1-A', '/toggle', (version='1.1-A') => toggle);

niverso.post('2.0-A', '/turnOn', niverso.deprecate);
niverso.post('2.0-A', '/turnOff', niverso.deprecate);

//deprecate all
niverso.get('2.0-B', '/isOn', niverso.deprecate);
niverso.post('2.0-B', '/turnOn', niverso.deprecate);
niverso.post('2.0-B', '/turnOff', niverso.deprecate);
niverso.get('2.0-B', '/color', niverso.deprecate);
niverso.post('2.0-B', '/color', niverso.deprecate);

niverso.get('2.0-B', '/brightness', niverso.deprecate);
niverso.post('2.0-B', '/brightness', niverso.deprecate);

niverso.post('2.0-B', '/toggle', niverso.deprecate);

niverso.get('2.0-B', '/state', (version='2.0-B') => getState);
niverso.post('2.0-B', '/state', (version='2.0-B') => setState);

niverso.start(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000, () => console.log('Server listening on port 3000'));
