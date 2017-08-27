//Requiring models directory, our passport configuration, and imdb-api package
var db = require('../models');
var passport = require("../config/passport");

module.exports= function(app){


//PASSPORT ROUTES
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/admin");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {

      console.log("ERROR: " + err)
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

	//route to handle imdb get movie request
	app.get('/api/events', function(req, res){
		console.log(db.Event)
		db.Event.findAll({}).then(function(data){
			console.log(data);
			res.json(data);
		})
	});

	app.post("/api/events", function(req, res) {
		console.log(req.body);

		db.Event.create({
			title: req.body.title,
      location: req.body.location,
      date: req.body.date,
			notes: req.body.notes,
      url: req.body.url
			
		}).then(function(data) {
			res.json(data);
		}).catch(function(err){
			console.log(err);
		});
	}); 

	app.put("/api/events/title", function(req, res){

    db.Event.update({
    	title: req.body.title
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.json(data);
      })
	});

  app.put("/api/events/location", function(req, res){

    db.Event.update({
      location: req.body.location
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.json(data);
      })
  });

  app.put("/api/events/date", function(req, res){

    db.Event.update({
      date: req.body.date
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.json(data);
      })
  });

  app.put("/api/events/notes", function(req, res){

    db.Event.update({
      notes: req.body.notes
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.json(data);
      })
  });

  app.put("/api/events/url", function(req, res){

    db.Event.update({
      url: req.body.url
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(data){
        res.json(data);
      })
  });

	app.delete("/api/events/delete", function(req, res) {
    console.log("handle delete hit")

		db.Event.destroy({
			where: {
				id: req.body.id
			}
		}).then(function(data) {
			res.json(data); 
		});
	});
}//end module.exports