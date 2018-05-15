const Metalsmith      = require('metalsmith');
const layouts         = require('metalsmith-layouts');
const markdown        = require('metalsmith-markdown');
const permalinks      = require('metalsmith-permalinks');
const sass            = require('metalsmith-sass');
const noop            = require('./lib/noop');
const drafts          = require('metalsmith-drafts');
const inPlace         = require('./lib/inPlace');
const path            = require('path');

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
    atRoot: function (target) { return path.join(__dirname, target); },
    urlOnGithubPages: function(path){ return "https://"+("headjump.github.io/headjump_website/"+path).split("//").join("/"); },
    websiteUrl: "http://headjump.de",
    facebookShareURL:"https://www.facebook.com/sharer/sharer.php?u=",
    twitterShareURL:"https://twitter.com/intent/tweet?text=",
    useGA: false, // use google analytics?
    gaId: "UA-3535743-4",
    touchOrDesktop: function (onTouch, onDesktop, tag) {
      tag || (tag = 'span')
      return `<${tag} class="show-touch">${onTouch}</${tag}><${tag} class="show-desktop">${onDesktop}</${tag}>`
    },
    icon: function(iconName){ return `<i class="fa fa-${iconName}"></i>`},
    getInitBtnId:function(btns){
      switch(btns.init){
        case "dpad": return 1;
        case "leftright": return 2;
        case "updown": return 3;
        case "analog": return 4;
      }
      return 1; // dpad
    },
    title: "",
    page_description: "Indiegames and Pixels by Dennis Treder. HTML5, Javascript, Gamedesign, Illustrations."
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use((preview_drafts ? noop : drafts)())
  .use(inPlace({
    pattern: ["*.html*", "*.ejs*", "*.md*"],
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