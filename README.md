# vinyl-source-buffer

[![Build Status](https://travis-ci.org/zertosh/vinyl-source-buffer.svg?branch=master)](https://travis-ci.org/zertosh/vinyl-source-buffer)

Convert a text stream into a vinyl pipeline whose content is a buffer. The typical use case being that using a [browserify](https://github.com/substack/node-browserify) stream in a gulp pipeline.

## Usage

```js
// in a gulp task
var source = require('vinyl-source-buffer');
var browserify = require('browserify');
var b = browserify('main.js');
b.bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('public'));
```

## Acknowledgments

`vinyl-source-buffer` is mostly based on [vinyl-source-stream](https://github.com/hughsk/vinyl-source-stream).
