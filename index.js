const Metalsmith      = require('metalsmith');
const collections     = require('metalsmith-collections');
const layouts         = require('metalsmith-layouts');
const markdown        = require('metalsmith-markdown');
const permalinks      = require('metalsmith-permalinks');
const sass            = require('metalsmith-sass');
const inPlace           = require('metalsmith-in-place');
//var Consolidate       = require('metalsmith-engine-consolidate');


Metalsmith(__dirname)
  .metadata({
    title: "hello",
    sitename: "My Static Site & Blog",
    siteurl: "http://example.com/",
    description: "It's about saying »Hello« to the world.",
    hello: function(val) { return "Hello " + val; }
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(collections({
    posts: 'posts/*.md'
  }))
  .use(inPlace({
    engineOptions: {
      "cache": false
    }
  }))
  .use(markdown())
  .use(sass())
  .use(layouts({
    engine: 'ejs',
    default: 'layout.html'
  }))
  .use(permalinks({
    relative: false
  }))
  .build(function (err) {
    if(err) { console.log(err); }
    else { console.log("DONE :)")}
  });