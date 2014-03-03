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

exports.vidwall = function (req, res) {
	res.render('vidwall');
};