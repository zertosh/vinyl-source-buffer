var File = require('vinyl');
var fs = require('fs');
var stream = require('stream');
var test = require('tape');

var source = require('./');

test('vinyl-source-buffer', function(t) {
  t.plan(3);

  var filename = __filename;
  var src = fs.readFileSync(filename, 'utf8');

  var testStream = new stream.Transform({objectMode: true});
  testStream._transform = function transform(file, enc, next) {
    t.ok(file instanceof File, 'file is a vinyl instance');
    t.equal(file.path, filename, 'filename matches');
    t.equal(file.contents.toString(), src, 'file contents matches');
    t.end();
  };

  fs.createReadStream(filename)
    .pipe(source(filename))
    .pipe(testStream);
});
