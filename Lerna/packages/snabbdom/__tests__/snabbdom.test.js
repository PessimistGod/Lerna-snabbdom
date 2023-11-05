'use strict';

const snabbdom = require('..');
const assert = require('assert').strict;

assert.strictEqual(snabbdom(), 'Hello from snabbdom');
console.info('snabbdom tests passed');
