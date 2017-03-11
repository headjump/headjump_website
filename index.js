const Metalsmith      = require('metalsmith');
const collections     = require('metalsmith-collections');
const layouts         = require('metalsmith-layouts');
const markdown        = require('metalsmith-markdown');
const permalinks      = require('metalsmith-permalinks');


Metalsmith(__dirname)
  .metadata({
    sitename: "My Static Site & Blog",
    siteurl: "http://example.com/",
    description: "It's about saying »Hello« to the world."
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(collections({
    posts: 'posts/*.md'
  }))
  .use(markdown())
  .use(permalinks({
    relative: false
  }))
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function (err) {
    console.log(err);       
  });