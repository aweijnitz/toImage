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
} catch(err) {
  console.error(err.msg);
  process.exit(1);
}

var width = argv.w;
var height = argv.h;
var isLE = !!argv.l ? true : false; // determines if we intepret the bit planes as Big or Little Endian

// Note: Assumes 10 bit values in the files
var rgbBuffers = [];
rgbBuffers[0] = fs.readFileSync(argv._[0]); // Red
rgbBuffers[1] = fs.readFileSync(argv._[1]); // Green
rgbBuffers[2] = fs.readFileSync(argv._[2]); // Blue

var image = new Jimp(width, height, function (err, image) {
  // this image is width x height, every pixel is set to 0x00000000
    
  // Construct the image, looping over the buffer and writing pixel values from the files.
    var nextPixel = 0;
    var r,g,b;
    for (var i = 0; i < this.bitmap.data.length; i=i+4) {
	if(isLE) { // Little Endian data
	    r = to8bit(rgbBuffers[0].readUInt16LE(nextPixel));
	    g = to8bit(rgbBuffers[1].readUInt16LE(nextPixel));
	    b = to8bit(rgbBuffers[2].readUInt16LE(nextPixel));
	} else { // Big Endian
	    r = to8bit(rgbBuffers[0].readUInt16BE(nextPixel));
	    g = to8bit(rgbBuffers[1].readUInt16BE(nextPixel));
	    b = to8bit(rgbBuffers[2].readUInt16BE(nextPixel));
	}
	var rgba = ((r << 24) | (g << 16) | (b << 8) | 0xff) >>> 0; // the last operand is needed to force an 32bit *unsigned* int
	nextPixel += 2; // Each pixel value is a 10 bit integer so we skip two bytes each step
	isLE ? image.bitmap.data.writeUInt32LE(rgba, i) : image.bitmap.data.writeUInt32BE(rgba, i);
  }
  image.write(argv.o);
});
