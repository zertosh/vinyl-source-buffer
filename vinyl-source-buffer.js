'use strict';

var File = require('vinyl');
var path = require('path');
var stream = require('stream');
var util = require('util');

module.exports = VinylSourceBuffer;
util.inherits(VinylSourceBuffer, stream.Transform);

function VinylSourceBuffer(filename, base) {
  if (!(this instanceof VinylSourceBuffer)) {
    return new VinylSourceBuffer(filename, base);
  }
  stream.Transform.call(this, {objectMode: true});
  this._base = base;
  this._chunks = [];
  this._filename = filename;
  this.once('end', this._destroy);
}

VinylSourceBuffer.prototype._transform = function(buf, enc, cb) {
  this._chunks.push(buf);
  cb();
};

VinylSourceBuffer.prototype._flush = function(cb) {
  var file = new File({
    path: this._filename ? path.resolve(this._filename) : null,
    base: this._base,
    contents: Buffer.concat(this._chunks)
  });
  this.push(file);
  cb();
};

VinylSourceBuffer.prototype._destroy = function() {
  this._base = this._chunks = this._filename = null;
};
