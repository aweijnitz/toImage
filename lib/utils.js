var path = require('path');

module.exports.imageFormatFromName = function imageFormatFromName(filepath) {
  return path.extname(filepath) || 'png';
};

// Inspired from Arduino map(...)
var map = function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

module.exports.map = map;

module.exports.to8bit = function to8bit(x) {
  var mapped = Math.floor(map(x, 0, 1023, 0, 255));
  if (mapped < 0)
    return 0;
  else if (mapped > 255)
    return 255;
  else
    return mapped;
};
