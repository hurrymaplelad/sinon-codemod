## sinon-codemod

[![Build Status](https://img.shields.io/travis/hurrymaplelad/sinon-codemod.svg?style=flat-square)](https://travis-ci.org/hurrymaplelad/sinon-codemod) [![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This repository contains a collection of codemod scripts based for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) that help update Sinon APIs.

### Setup & Run

* `npm install -g jscodeshift`
* `git clone https://github.com/hurrymaplelad/sinon-codemod.git` or download a zip file
  from `https://github.com/hurrymaplelad/sinon-codemod/archive/master.zip`
* Run `npm install` in the sinon-codemod directory
  * Alternatively, run [`yarn`](https://yarnpkg.com/) to install in the
    sinon-codemod directory for a reliable dependency resolution
* `jscodeshift -t <codemod-script> <path>`
* Use the `-d` option for a dry-run and use `-p` to print the output
  for comparison

### Included Scripts

#### `extract-calls-fake`

Converts 3-argument calls to `sinon.stub(x,y,z)` into `sinon.stub(x,y).callsFake(z)`.

```sh
jscodeshift -t sinon-codemod/extract-calls-fake.js <path>
```

#### `migrate-to-v5`

Removes `sandbox` variable declaration

Removes `sinon.sandbox.create();`

Replaces `sandbox.restore()` with `sinon.restore()`

Replaces `sandbox.stub()` with `sinon.stub()`

Replaces `sandbox.spy()` with `sinon.spy()`

Replaces `sandbox.mock()` with `sinon.mock()`

```sh
jscodeshift -t sinon-codemod/migrate-to-v5.js <path>
```