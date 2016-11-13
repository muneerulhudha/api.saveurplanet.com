/**
 * ClarifaiController
 *
 * @description :: Server-side logic for managing clarifais
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('SaveUrPlanet', 'deadfbe6-3bb4-48bf-bcd7-2b075528e263');

module.exports = {
	
	index: function(req, res) {

		rapid.call('Clarifai', 'getTags', {
			'accessToken': 'TAhbCp1sDtNF6lEYxyNdI67WbGHWwY',
			'urls': '["http://4.bp.blogspot.com/-xnid78EdySM/UUS4jJFUpaI/AAAAAAAAbiA/ZIhvkPw4Nrc/s1600/ct+seven.jpg"]',
			'file': '',
			'model': '',
			'tagsLanguage': '',
			'selectClasses': ''
		}).on('success', (payload) => {
			var tags = payload.results[0].result.tag.classes;

			console.log(tags);

			if(tags.indexOf('chicken') > -1) {
				Food.create({type: 'chicken', cfvalue: '3.5'}).exec(function(err, receipts) {
					if(err) {
						console.log("Error on mongo create - food");
						res.send("Error - Food insert", 500);
					} else {
						Chart.findOne({type: "food"}).exec(function(err, food) {

							food.cfvalue = food.cfvalue + 3.5;
							Chart.update({type: "food"}, food).exec(function(err, food) {
								res.send("success", 200);
							});
							
						});
					}
				});
			} else if(tags.indexOf('pork') > -1) {
				Food.create({type: 'pork', cfvalue: '6'}).exec(function(err, receipts) {
					if(err) {
						console.log("Error on mongo create - food");
						res.send("Error - Food insert", 500);
					} else {
						Chart.findOne({type: "food"}).exec(function(err, food) {

							food.cfvalue = food.cfvalue + 3.5;
							Chart.update({type: "food"}, food).exec(function(err, food) {
								res.send("success", 200);
							});
							
						});
					}
				});
			} else if(tags.indexOf('beef') > -1) {
				Food.create({type: 'beef', cfvalue: '13.5'}).exec(function(err, receipts) {
					if(err) {
						console.log("Error on mongo create - food");
						res.send("Error - Food insert", 500);
					} else {
						Chart.findOne({type: "food"}).exec(function(err, food) {

							food.cfvalue = food.cfvalue + 3.5;
							Chart.update({type: "food"}, food).exec(function(err, food) {
								res.send("success", 200);
							});
							
						});
					}
				});
			} else if(tags.indexOf('vegetables') > -1) {
				Food.create({type: 'vegetables', cfvalue: '2'}).exec(function(err, receipts) {
					if(err) {
						console.log("Error on mongo create - food");
						res.send("Error - Food insert", 500);
					} else {
						Chart.findOne({type: "food"}).exec(function(err, food) {

							food.cfvalue = food.cfvalue + 3.5;
							Chart.update({type: "food"}, food).exec(function(err, food) {
								res.send("success", 200);
							});
							
						});
					}
				});
			}

		}).on('error', (payload) => {
			console.log(payload);
		});

	}

};

