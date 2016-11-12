/**
 * HelloController
 *
 * @description :: Server-side logic for managing helloes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	get: function(req, res) {
		res.send("Hello World!", 200);
	}

};

