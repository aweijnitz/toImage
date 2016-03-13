var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var width = argv.w || 16;

var data = fs.readFileSync(argv._[0]);
var nrWholeRows = Math.floor(data.length / width);

// Do all complete rows
for(var i = 0; i < nrWholeRows; i++) {
  for (var w = 0; w < width; w++) {
    var val = data.readUInt8(i*width + w).toString(16);

    // Leading zero
    if(val.length < 2)
      console._stdout.write('0');
    console._stdout.write(val);

    if(w < (width - 1))
      console._stdout.write(',');
  }
  console._stdout.write('\n');

}

// Do remainder
for(var r = 0; r < (data.length % width); r++) {
  console._stdout.write(data.readUInt8(r).toString(16));
}


