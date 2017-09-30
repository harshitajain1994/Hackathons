//users_controller.js
var User = require("../models/users_model.js")
var Utils = require("../utils/utility.js")

exports.createUser = function(req, res) {

    var user = new User({
    gender: req.body.gender,
    status: req.body.status,
    cancersubtype: req.body.cancersubtype,
    language: req.body.language,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email:  req.body.email,
    password: req.body.password,
    age: req.body.age,
    occupation: req.body.occupation,
    address : req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    profile_pic: req.body.profile_pic,
    role : req.body.role,
    cancertype: req.body.cancertype,
    side_effects: req.body.side_effects,
    symptoms:req.body.symptoms,
    story: req.body.story,
    surgery: req.body.surgery,
    radiation_therapy: req.body.radiation_therapy,
    chemo_therapy: req.body.chemo_therapy,
    immunotherapy: req.body.immunotherapy,
    targeted_therapy: req.body.targeted_therapy,
    stem_cell_therapy: req.body.stem_cell_therapy,
    });


    user.save(function(err) {

      if (err) {
      var duplicateKey = 11000
      if (err.code == duplicateKey){
        return Utils.send(res, "error", "user already exists")
      }

      return Utils.db_error(res,err)
      } 

      else
      Utils.send(res,"success", "user created successfully")
      });  

}



exports.signupPage = function(req,res) {
  res.render("signup.jade", {layout:false});
}

exports.loginPage = function(req,res)
{
  res.render("login.jade", {layout: false});
}

exports.loginUser = function(req, res) {

  var query = {'username':req.body.username}

    User.findOne(query, function(err, user) {
      if(err) return res.send(err);
        if(user == null) {
          Utils.send(res,"error", "invalid username/email/phone")

        } 
        else {
          auth(user)
        }
    });

    function auth( user ) {
      user.verifyPassword(req.body.password,function(err, isMatched) {
        if(err) return res.send(err)
        if (!isMatched) {
        Utils.send(res,"error","invalid password")
        }
        else {
          res.json({"username":user.username, "status":"success"})
        }
      });
    }


}

// Function to get User details when username is passed
exports.getUser = function(req,res) {
  User.findOne({username:req.params.username} , function(err, user) {
    if (err) return dbError(res, err)
    // removing password field from user object 
    user.password=undefined
    res.json(user)
  })
}
