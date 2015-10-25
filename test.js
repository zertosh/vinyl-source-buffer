var File = require('vinyl');
var fs = require('fs');
var path = require('path');
var stream = require('stream');
var test = require('tap').test;

var source = require('./');

test('vinyl-source-buffer', function(t) {
  t.plan(6);

  var filename = __filename;
  var src = fs.readFileSync(filename, 'utf8');

  var testStream = new stream.Transform({objectMode: true});
  testStream._transform = function transform(file, enc, next) {
    t.ok(file instanceof File, 'file is a vinyl instance');
    t.equal(file.path, filename, 'filename matches');
    t.equal(file.contents.toString(), src, 'file contents matches');
    this.push(file);
    next();
  };
  testStream.on('finish', function() {
    t.equal(sourceStream._base, null, 'empty base');
    t.equal(sourceStream._chunks, null, 'empty chunks');
    t.equal(sourceStream._filename, null, 'empty filename');
  });

  var sourceStream = source(filename);

  fs.createReadStream(filename)
    .pipe(sourceStream)
    .pipe(testStream);
});

test('basedir', function(t) {
  t.plan(3);

  var file;

  var filename = __filename;
  var base = __dirname + '/node_modules';

  var sourceStream = source(filename, base);
  sourceStream.write(new Buffer('abc'));
  sourceStream.on('data', function(file_) { file = file_; });
  sourceStream.end();

  sourceStream.on('end', function() {
    t.ok(file instanceof File, 'file is a vinyl instance');
    t.equal(file.relative, path.relative(base, filename), 'filename matches');
    t.equal(file.contents.toString(), 'abc', 'file contents matches');
  });
});
