var File = require('vinyl');
var fs = require('fs');
var test = require('tape');
var through = require('through2');

test('vinyl-source-buffer', function(t) {

  t.plan(3);

  var source = require('./');

  fs.createReadStream(__filename)
    .pipe(source(__filename))
    .pipe(through.obj(function(file, enc, next) {

      t.ok(file instanceof File, 'file is a vinyl instance');

      t.equal(file.path, __filename, 'filename matches');

      t.equal(
        file.contents.toString(),
        fs.readFileSync(file.path, 'utf8'),
        'file contents matches');

      t.end();
    }));

});
