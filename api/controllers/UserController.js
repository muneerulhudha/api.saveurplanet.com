/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	register: function(req, res) {
		User.create(req.body).exec(function(err, user) {
			if(err) {
				console.log("Error on mongo create - user");
				res.send("Error - User insert", 500);
			} else {
				res.send("user logged", 200);
			}
		});
	}

};

