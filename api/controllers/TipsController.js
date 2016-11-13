/**
 * TipsController
 *
 * @description :: Server-side logic for managing tips
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI('SaveUrPlanet', 'deadfbe6-3bb4-48bf-bcd7-2b075528e263');

module.exports = {
	
	get: function(req, res) {

		Tips.find().exec(function(err, tips) {
			
			var rand = getRandomInt(0,2);
			var msg = tips[rand].tips;

			rapid.call('Twilio', 'sendSms', { 
				'accountSid': 'AC0db15c197fa4bda3d1eecdea04c65b1a',
				'accountToken': '9a6f5ac188b4c03cf4df558a52f6bc8a',
				'from': '+14697891582',
				'messagingServiceSid': 'MG41b2ed7bc1b7ef74b083acb5d00545a5',
				'to': '+14699519382',
				'body': msg,
				'statusCallback': '',
				'applicationSid': '',
				'maxPrice': '',
				'provideFeedback': ''
			 
			}).on('success', (payload)=>{
				 res.send(tips, 200);
			}).on('error', (payload)=>{
				 /*YOUR CODE GOES HERE*/ 
			});

		});

	}

};


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

