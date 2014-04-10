/*
 * GET home page.
 */

// The home page
exports.index = function(req, res){
	var params = {
		css: ['index']
	};
	res.render('index', params);
};

// About page
exports.about = function (req, res) {
  res.render('about');
};

exports.vidwall = function (req, res) {
	res.render('vidwall');
};

exports.notfound = function (req, res) {
  res.render('404');
};