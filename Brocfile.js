var alchemist = require('broccoli-module-alchemist');
var mergeTrees = require('broccoli-merge-trees');
var funnel = require('broccoli-funnel');

module.exports = mergeTrees([
  alchemist(),
  funnel('src', { include: ['*.html'] })
]);
