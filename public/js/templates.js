this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["card"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div class=\"areyouhungrynow card\" data-id=\"areyouhungrynow\">\n  ";
  stack1 = self.invokePartial(partials['cards/components/navigationButtons'], 'cards/components/navigationButtons', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"cardContent\">\n    <div class=\"open\"></div>\n    <div class=\"closed\">\n      ";
  stack1 = self.invokePartial(partials['cards/data/areyouhungrynow/closed'], 'cards/data/areyouhungrynow/closed', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n</div>";
  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["closed"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<img src=\"/images/icons/github.svg\" alt=\"Github\" class=\"svg\">";
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["open"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  stack1 = self.invokePartial(partials['cards/components/closeButton'], 'cards/components/closeButton', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"leftArea\">\n  <h3 class=\"name\">Vidwall</h3>\n  <p class=\"description\">Use Youtube's API </p>\n  <h4>Programming highlights:</h4>\n  <ul class=\"devnotes\">\n    <li>Youtube API</li>\n    <li>Dynamic resizing</li>\n  </ul>\n  <a href=\"https://github.com/granttimmerman/Flash-Games/tree/master/Games/Cellular%20Warfare\">See the source on Github</a>\n</div>\n<div class=\"rightArea\">\n</div>";
  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["card"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div class=\"cellularwarfare card\" data-id=\"cellularwarfare\" id=\"cellularwarfare\">\n  ";
  stack1 = self.invokePartial(partials['cards/components/navigationButtons'], 'cards/components/navigationButtons', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"cardContent\">\n    <div class=\"open\"></div>\n    <div class=\"closed\">\n      ";
  stack1 = self.invokePartial(partials['cards/data/cellularwarfare/closed'], 'cards/data/cellularwarfare/closed', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n</div>";
  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["closed"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["open"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  stack1 = self.invokePartial(partials['cards/components/closeButton'], 'cards/components/closeButton', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"leftArea\">\n  <h3 class=\"name\">Cellular Warfare</h3>\n  <p class=\"description\">Conquer the cell kingdom and evolve into an almighty cell! Along the way you will be able to upgrade your cell's speed, size, and growth rate. Try to get the fastest time! <br> Song: Colour My World - COIN (liluxiaorealnew)</p>\n  <div class=\"instructions\">\n    <h4 class=\"title\">Instructions</h4>\n    <ul>\n      <li>Move: W,S,A,D</li>\n      <li>M: Menu</li>\n      <li>P: Pause</li>\n      <li>R: Restart</li>\n    </ul>\n  </div>\n  <div class=\"devnotes\">\n    <h4 class=\"title\">Programming highlights:</h4>\n    <ul>\n      <li>Array of Cell objects</li>\n      <li>Ellipse vs. ellipse collision detection</li>\n      <li>Oscillating cell size</li>\n      <li>Ugrading cell properties</li>\n      <li>Acceleration and max speed of cell</li>\n      <li>Use of AS Timer class</li>\n      <li>Key shortcuts</li>\n    </ul>\n  </div>\n  <a href=\"https://github.com/granttimmerman/Flash-Games/tree/master/Games/Cellular%20Warfare\" class=\"githubLink\">See the source on Github</a>\n</div>\n<div class=\"rightArea\">\n  <object class=\"swf\" type=\"application/x-shockwave-flash\" data-aspectratio=\"550:400\" data=\"/flash/cellularwarfare/cellular_warfare.swf\">\n    <param name=\"movie\" value=\"/flash/cellularwarfare/cellular_warfare.swf\">\n    ";
  stack1 = self.invokePartial(partials['errors/noflash'], 'errors/noflash', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n     </object>\n</div>";
  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["card"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div class=\"glass card\" data-id=\"glass\">\n  ";
  stack1 = self.invokePartial(partials['cards/components/navigationButtons'], 'cards/components/navigationButtons', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"cardContent\">\n    <div class=\"open\"></div>\n    <div class=\"closed\">\n      ";
  stack1 = self.invokePartial(partials['cards/data/glass/closed'], 'cards/data/glass/closed', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n</div>";
  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["closed"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<img src=\"/images/icons/play.svg\" alt=\"Play\" class=\"svg\">\n<div class=\"vidwallSearch\">\n  <input type=\"text\" value=\"hi\">\n</div>";
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["open"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  stack1 = self.invokePartial(partials['cards/components/closeButton'], 'cards/components/closeButton', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"leftArea\">\n  <h3 class=\"name\">Vidwall</h3>\n  <p class=\"description\">Use Youtube's API </p>\n  <h4>Programming highlights:</h4>\n  <ul class=\"devnotes\">\n    <li>Youtube API</li>\n    <li>Dynamic resizing</li>\n  </ul>\n  <a href=\"https://github.com/granttimmerman/Flash-Games/tree/master/Games/Cellular%20Warfare\">See the source on Github</a>\n</div>\n<div class=\"rightArea\">\n</div>";
  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["card"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div class=\"thefourelements card\" data-id=\"thefourelements\" id=\"thefourelements\">\n  ";
  stack1 = self.invokePartial(partials['cards/components/navigationButtons'], 'cards/components/navigationButtons', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"cardContent\">\n    <div class=\"open\"></div>\n    <div class=\"closed\">\n      ";
  stack1 = self.invokePartial(partials['cards/data/thefourelements/closed'], 'cards/data/thefourelements/closed', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n</div>";
  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["closed"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["open"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  stack1 = self.invokePartial(partials['cards/components/closeButton'], 'cards/components/closeButton', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"leftArea\">\n  <h3 class=\"name\">The Four Elements</h3>\n  <p class=\"description\">Master the four elements by solving each of the unique marble puzzles.</p>\n  <p class=\"instructions\"><span class=\"title\">Instructions:</span> Hop one marble over another. Try to leave the least number of marbles as possible. Music controls are located on the bottom left.</p>\n  <a href=\"https://github.com/granttimmerman/Flash-Games/tree/master/Games/The%20Four%20Elements/Final/Game\" class=\"githubLink\">See the source on Github</a>\n</div>\n<div class=\"rightArea\">\n  <object class=\"swf\" type=\"application/x-shockwave-flash\" data-aspectratio=\"4:3\" data=\"/flash/thefourelements/elements.swf\">\n    <param name=\"movie\" value=\"/flash/thefourelements/elements.swf\">\n    ";
  stack1 = self.invokePartial(partials['errors/noflash'], 'errors/noflash', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </object>\n</div>";
  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["card"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div class=\"vidwall card\" data-id=\"vidwall\" id=\"vidwall\">\n  ";
  stack1 = self.invokePartial(partials['cards/components/navigationButtons'], 'cards/components/navigationButtons', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"cardContent\">\n    <div class=\"open\"></div>\n    <div class=\"closed\">\n      ";
  stack1 = self.invokePartial(partials['cards/data/vidwall/closed'], 'cards/data/vidwall/closed', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n</div>";
  return buffer;
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["closed"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"svg\"></div>";
  };;
this["MyApp"] = this["MyApp"] || {};this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};this["MyApp"]["templates"]["open"] = module.exports = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  stack1 = self.invokePartial(partials['cards/components/closeButton'], 'cards/components/closeButton', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"searchArea\">\n  <h1 class=\"title\">Search anything...</h1>\n  <input type=\"text\" class=\"query\" value=\"psy\" />\n</div>";
  return buffer;
  };;