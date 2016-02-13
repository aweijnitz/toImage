/**
 * This is a small utility script used for generating test data. Modify it to generate data with the content and endianess you need.
 */

var fs = require('fs');

var name = '320x200px_xE_0000.bin';
var pixels = 320 * 200;
var buf = new Buffer(pixels * 2); // 16bit 320x200
var data = 0x0000;
var littleEndian = true;

var nextPixel = 0;
for (var i = 0; i < pixels; i++) {
  littleEndian ? buf.writeUInt16LE(data, nextPixel) : buf.writeUInt16BE(data, nextPixel);
  nextPixel += 2;
}

fs.writeFileSync(name, buf, {
  encoding: null
});
