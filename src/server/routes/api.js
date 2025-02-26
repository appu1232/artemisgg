var respond = require("../lib/respond");

var User = require("../models/User");

module.exports = function (app) {

  //intro
  app.get('/api', function(req, res) {
    res.json("welcome to the artemisgg api!")
  });

  app.get('/api/user', function(req,res){
		User.find({}, function(err, docs){
			return respond(res, err, docs);
		});
	});

  app.post('/api/user', function(req,res) {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      admin: false
    });
    newUser.save(function(err){
      respond(res, err);
    });
  });

  // //get all users
  // app.get('/api/user', function(req, res) {
  //   User.find(function(err, users) {
  //     if (err)
  //       res.send(err);
  //
  //     res.json(users);
  //   });
  // });
  //
  // //create new user
  // app.post('/api/user', function(req, res) {
  //   var user = new User(); //new user model
  //   user.username = req.body.username;
  //   user.password = req.body.password;
  //   user.admin = req.body.admin;
  //
  //   user.save(function(err) {
  //     if(err)
  //       res.send(err);
  //     res.json({message: 'User created!'});
  //   });
  // })
  //
  // //get user by id
  // app.get('/api/users/:id', function(req, res) {
  //   User.find({"_id": req.params.id}, function(err, user){
  //     if (err)
  //       res.send(err);
  //     res.json(user);
  //   });
  // });
  //
  // //delete user by id
  // app.delete('/api/users/:id', function(req, res) {
  //   User.remove({_id: req.params.id}, function(err, user){
  //     if(err)
  //       res.send(err);
  //     res.json({message: 'User deleted!'});
  //   });
  // });
}
