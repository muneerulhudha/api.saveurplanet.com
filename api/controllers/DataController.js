/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	overall: function(req, res) {
		Chart.find().exec(function(err, chartData) {
			var obj = {};

			chartData.forEach(function(entry) {
				obj[entry.type] = entry.cfvalue;
			});

			res.send(obj, 200);
		});
	},

	daily: function(req, res) {
		var obj={};

		Food.find().exec(function(err, foodData) {
			obj["food"] = foodData;

			Transport.find().exec(function(err, tranData) {
				obj["transport"] = tranData;

				var foodValue = 0, tranValue = 0;

				obj["food"].forEach(function(entry) {
					foodValue = foodValue + parseFloat(entry.cfvalue);
				});

				obj["transport"].forEach(function(entry) {
					tranValue = tranValue + parseFloat(entry.cfvalue);
				});

				var result = {
					food: foodValue,
					transport: tranValue
				};

				res.send(result, 200);
			});

		});
	},

	weekly: function(req, res) {
		var obj = {
			series: ['Series A', 'Series B'],
			data: [[86.6, 84.2, 89, 85.5, 89.2, 85.1, 91],[85, 85, 85, 85, 85, 85, 85]]
		};
	
		res.send(obj, 200);
	}
	
};
