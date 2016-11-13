/**
 * ReceiptsController
 *
 * @description :: Server-side logic for managing receipts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	get: function(req, res) {
		//var obj = JSON.parse(req.body);
		console.log(req.body);

		Receipts.create(req.body).exec(function(err, receipts) {
			if(err) {
				console.log("Error on mongo create - receipts");
				res.send("Error - Receipts insert", 500);
			} else {
				res.send("receipts logged", 200);
			}
		});
	}

};

