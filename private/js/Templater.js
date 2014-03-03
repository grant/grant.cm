// Requires
var Handlebars = require('handlebars');
var templates = require('./templates')(Handlebars);

// Setup handlebars with global partials as all templates
Handlebars.partials = templates;

/**
 * Handles all client-side templating
 */
var Templater = {
  /**
   * Renders a processed version of a template
   * @param {URL} url The template URL to use
   * @param {Object} [view] Any view preferences
   * @returns {DOMElement} A processed dom block
   */
  render: function (url, view) {
    if (templates[url] === undefined) {
      console.log(url);
      console.log(templates);
      throw 'Template not found';// TODO: Throw real error
    }
    return templates[url](view);
  }
};

module.exports = Templater;