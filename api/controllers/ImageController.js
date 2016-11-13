/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI('SaveUrPlanet', 'deadfbe6-3bb4-48bf-bcd7-2b075528e263');

module.exports = {
	
	index: function(req, res) {

		rapid.call('MicrosoftComputerVision', 'ocr', { 
			'image': 'http://i.imgur.com/7DWPfAB.jpg',
			'subscriptionKey': '590cd1e1f0664bddb1255f0a06e4bfa3',
			'language': '',
			'detectOrientation': ''
		 
		}).on('success', (payload)=>{
			 var currency = JSON.parse(payload).regions[14].lines[1].words[0].text;
			 var number = Number(currency.replace(/[^0-9\.]+/g,""));

			 var cf = number/9;

			Household.create({type: 'electricity', cfvalue: cf}).exec(function(err, receipts) {
				if(err) {
					console.log("Error on mongo create - electricity");
					res.send("Error - Electricity insert", 500);
				} else {
					Chart.findOne({type: "household"}).exec(function(err, hh) {

						hh.cfvalue = cf;
						Chart.update({type: "household"}, hh).exec(function(err, hh) {
							res.send("success", 200);
						});
						
					});
				}

			});			 
		}).on('error', (payload)=>{
			 console.log(payload); 
		});

	}

};
