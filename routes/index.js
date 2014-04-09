/*
 * GET home page.
 */

// The home page
exports.index = function(req, res){
	var indexParams = {
		title: "Grant Timmerman's Portfolio"
	};
	res.render('index', indexParams);
};

// About page
exports.about = function (req, res) {
  res.render('about');
};

exports.vidwall = function (req, res) {
	res.render('vidwall');
};

exports.google = function (req, res) {
	res.sendfile('googlefaf81eb610534b6f.html');
};

exports.notfound = function (req, res) {
  res.render('404');
};