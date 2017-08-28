	var Twitter = require("twitter");

	module.exports = function(app) {

		app.get("/twitter", function(req, res) {

			var twitterkeys = {
			  consumer_key: 'Akyp7R7GkVQYg8Oa9I3JOOfI0',
			  consumer_secret: 'Tsc76DHpRZxMgz3XVdnYgOWYk9ezGCVpwFlqduAge61QSHdWnN',
			  access_token_key: '876581687836237824-F3qRHCQUAXZj6XtN71GqNglapmNRzXd',
			  access_token_secret: 'Uw4ap1RLTUm9NTHIvtPBVRfYbkxOaItXBEbU5kTkMyuiR'
			}; 
		
			var client = new Twitter(twitterkeys); 
			var params = {
				screen_name: "AnthonyPass94",
				count: 5
			};

			var data = [];

			client.get("statuses/user_timeline", params, function(error, tweets, res) {
				if(!error) {
					for(var i = 0; i < tweets.length; i++) {
						console.log(tweets[i].text); 
						console.log(tweets[i].created_at); 
						console.log("-----------------------------");
						data.push(tweets[i])
					}
					sendTweets()
				} else {
					if(error) {
						return console.log("Error Occurred: " + error); 
					}
				}
			})
			// console.log(data)
			// res.json(data)
			function sendTweets() {
				res.json(data)
			}
		}) //end twitter

	} //end exports