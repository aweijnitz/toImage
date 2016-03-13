var histogram = require('ascii-histogram');

var occurs = function occurs(key, data) {
  var result = 0;
  for(var i = 0; i < data.length; i++) {
    if(data.readUInt8(i) === key)
      result++;
  }
  return result;
};

module.exports.toHistogram = function toHistogram(data8bit) {
  data = {};
  for(var i = 0; i <= 0xff; i++) {
    var key = (i).toString(16);
    data[key] = occurs(i, data8bit);
  }
  return histogram(data);
};