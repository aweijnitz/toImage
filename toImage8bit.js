var fs = require('fs');
var checks = require('./lib/assertions.js');
var utils = require('./lib/utils.js');
var map = utils.map;
var to8bit = utils.to8bit;
var Jimp = require("jimp");


var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

// Check input
try {
  checks.assertThreeFiles(argv._); // need to have three input files and they need to exist
  checks.assertOutputFilename(argv.o); // need to have an output name
  checks.assertGeometry(argv.w, argv.h, argv._); // image dimensions need to match buffer sizes
} catch (err) {
  console.error(err.msg);
  process.exit(1);
}

var width = argv.w;
var height = argv.h;
var normalize = !!argv.n ? true : false; // use min and max values in data for normalization

// Note: Assumes 8 bit values in the files
var rgbBuffers = [];
rgbBuffers[0] = fs.readFileSync(argv._[0]); // Red
rgbBuffers[1] = fs.readFileSync(argv._[0]); // Green
rgbBuffers[2] = fs.readFileSync(argv._[0]); // Blue

// Get Min and Max values (used for optional normalization)
// Note: These are not true black and white points, but only a crude normalization.
var blackPoint = 0xfffe;
var whitePoint = 0x0000;
for (var i = 0; normalize && i < rgbBuffers[0].length; i += 2) {
  blackPoint = Math.min(blackPoint,
    rgbBuffers[0].readUInt8(i),
    rgbBuffers[1].readUInt8(i),
    rgbBuffers[2].readUInt8(i));
  whitePoint = Math.max(whitePoint,
    rgbBuffers[0].readUInt8(i),
    rgbBuffers[1].readUInt8(i),
    rgbBuffers[2].readUInt8(i));
}

if (normalize)
  to8bit = function (val) {
    var mapped = Math.floor(map(val, blackPoint, whitePoint, 0, 255));
    if (mapped < 0)
      return 0;
    else if (mapped > 255)
      return 255;
    else
      return mapped;
  };

var image = new Jimp(width, height, function (err, image) {
  // this image is width x height, every pixel is set to 0x00000000

  // Construct the image, looping over the buffer and writing pixel values from the files.
  var nextPixel = 0;
  var r, g, b;
  for (var i = 0; i < this.bitmap.data.length; i = i + 4) {
    r = rgbBuffers[0].readUInt8(nextPixel);
    g = rgbBuffers[1].readUInt8(nextPixel);
    b = rgbBuffers[2].readUInt8(nextPixel);
    var rgba = ((r << 24) | (g << 16) | (b << 8) | 0xff) >>> 0; // the last operand is needed to force an 32bit *unsigned* int
    nextPixel++;
    image.bitmap.data.writeUInt32LE(rgba, i);
    //image.bitmap.data.writeUInt32BE(rgba, i);
  }
  image.write(argv.o);
});
