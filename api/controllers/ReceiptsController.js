/**
 * ReceiptsController
 *
 * @description :: Server-side logic for managing receipts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	get: function(req, res) {
		//var obj = JSON.parse(req.body);

		Receipts.create(req.body).exec(function(err, receipts) {
			if(err) {
				console.log("Error on mongo create - receipts");
				res.send("Error - Receipts insert", 500);
			} else {
				res.send("receipts logged", 200);
			}
		});
	},

	parse: function(req, res) {

		Receipts.findOne({ from: "lyft" }).exec(function(err, receipt) {
			var content = receipt.msys.relay_message.content.text;
			
			var temp = content.match(/\d+[.]\d{0,2}mi, \d{0,2}m \d{0,2}s/gm);
			var result = temp[0].match(/\d+[.]\d{0,2}(?=mi)/gm);
 
			var cf = parseFloat(result[0])/ 18;

			Transport.create({ type: "lyft", cfvalue: cf}).exec(function(err, tran) {

				Chart.findOne({type: "transport"}).exec(function(err, tr) {

					tr.cfvalue = tr.cfvalue + cf;
					Chart.update({type: "transport"}, tr).exec(function(err, hh) {
						res.send("success", 200);
					});
					
				});

			});

		});

	}

};

