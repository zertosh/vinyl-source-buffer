var File = require('vinyl');
var path = require('path');
var stream = require('stream');
var util = require('util');

function VinylSourceBuffer(filename) {
  if (!(this instanceof VinylSourceBuffer)) {
    return new VinylSourceBuffer(filename)
  }
  stream.Transform.call(this, {objectMode: true});
  this._chunks = [];
  this._filename = filename;
}
util.inherits(VinylSourceBuffer, stream.Transform);

VinylSourceBuffer.prototype._transform = function(buf, enc, cb) {
  this._chunks.push(buf);
  cb();
};

VinylSourceBuffer.prototype._flush = function(cb) {
  var file = new File({
    path: this._filename ? path.resolve(this._filename) : null,
    contents: Buffer.concat(this._chunks)
  });
  this._chunks = null;
  this.push(file);
  cb();
};

module.exports = VinylSourceBuffer;
