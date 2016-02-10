var fs = require('fs');

var name = '320x200px_BE_03ff.bin';
var pixels = 320*200;

var buf = new Buffer(pixels*2); // 16bit 320x200

var nextPixel = 0;
for(var i = 0; i < pixels; i++) {
  buf.writeUInt16BE(0x03ff, nextPixel);
  nextPixel += 2;
}

fs.writeFileSync(name, buf, {
  encoding: null
});
