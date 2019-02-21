const CleanCSS = require('clean-css');
const generateTemplate = require('./templateGenerator');
const minTemplate = require('./templateGenerator.min.js');

/**
 * Main Template file that generates either a minified
 * or uncompressed template
 *
 *
 * @param {*} source The actual CSS content
 * @param {*} options The Options from webpack.config.js
 */
module.exports = function (source, options) {
  return !options.minify ? template(source)
    : minifiedTemplate(source);
};

function minifiedTemplate(source) {
  const cssMin = new CleanCSS({}).minify(source).styles;
  return minTemplate(cssMin);
}

function template(source) {
  return generateTemplate(source);
}

