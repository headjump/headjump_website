const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const sass = require('metalsmith-sass');
const noop = require('./noop');
const drafts = require('metalsmith-drafts');
const inPlace = require('metalsmith-in-place');
const path = require('path');

const
  preview_drafts = (process.argv.indexOf("--preview-drafts") !== -1);

console.log(`
--------------------------------------------------------------------
Preview drafts? -> ${preview_drafts ? "YES" : "NO"}
                   (use "yarn build" or "yarn build-preview-drafts")
--------------------------------------------------------------------
`);

Metalsmith(__dirname)
  .metadata({
    atRoot: function (target) {
      return path.join(__dirname, target);
    },
    title: "hello",
    header_class: "",
    sitename: "My Static Site & Blog",
    description: "It's about saying »Hello« to the world.",
    hello: function (val) {
      return "Hello " + val;
    }
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use((preview_drafts ? noop : drafts)())
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
    if (err) {
      console.log(err);
    }
    else {
      console.log("DONE :)")
    }
  });