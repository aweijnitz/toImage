var assert = require('assert');

// Module under test
var utils = require('../lib/utils.js');


describe('utils.js', function () {

  it('Should return expected file extension from file name', function () {
//	assert(utils.imageFormatFromName('/some/path/name.jpg') === 'jpg');
//	assert(utils.imageFormatFromName('name') === 'png'); // fallback is png
  });

  it('Should map value ranges correctly', function () {
    assert(utils.map(0, 0, 100, 0, 10) == 0);
    assert(utils.map(100, 0, 100, 0, 10) == 10);
    assert(utils.map(50, 0, 100, 0, 10) == 5);
    assert(utils.map(0, 0, 100, 0, 10) == 0);
  });

  it('Should map 10bit value ranges correctly', function () {
    assert(utils.to8bit(0x0) == 0);
    assert(utils.to8bit(0x3ff) == 0xff);
  });

  it('Should map and limit 10bit value overflow ranges correctly', function () {
    assert(utils.to8bit(-1) == 0);
    assert(utils.to8bit(0x400) == 0xff);
    assert(utils.to8bit(0xff00) == 0xff);
  });

});

