const Metalsmith      = require('metalsmith');
const collections     = require('metalsmith-collections');
const layouts         = require('metalsmith-layouts');
const markdown        = require('metalsmith-markdown');
const permalinks      = require('metalsmith-permalinks');
const sass            = require('metalsmith-sass');
const inPlace         = require('metalsmith-in-place');
const path            = require('path');

Metalsmith(__dirname)
  .metadata({
    atRoot: function(target) {
      return path.join(__dirname, target);
    },
    title: "hello",
    header_class: "",
    sitename: "My Static Site & Blog",
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
    engine: 'ejs'
  }))
  .use(permalinks({
    relative: false
  }))
  .build(function (err) {
    if(err) { console.log(err); }
    else { console.log("DONE :)")}
  });