var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish('build', {
  branch: 'gh-pages',
  repo: 'git@github.com:headjump/headjump_website.git'
}, function(err) {});