var path = require('path');

module.exports.imageFormatFromName = function imageFormatFromName(filepath) {
  return path.extname(filepath || '') || 'png';

};

// Inspired from Arduino map(...)
module.exports.map = function map(x, in_min, in_max, out_min, out_max)  {
  return Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}