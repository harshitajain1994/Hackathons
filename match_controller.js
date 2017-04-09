//users_controller.js
var User = require("../models/users_model.js")
var Utils = require("../utils/utility.js")

exports.getMatch = function(req, res) {

var properties = [
    {value:req.body.language, position:req.body.langpos}, 
    {value:req.body.minage, position:req.body.agepos}, 
    {value:req.body.maxage, position:req.body.agepos}, 
    {value:req.body.country, position:req.body.locationpos}, 
    {value:req.body.state, position:req.body.locationpos}, 
    {value:req.body.city, position:req.body.locationpos}, 
    {value:req.body.status, position:req.body.statuspos}, 
    {value:req.body.cancertype, position:req.body.cancertypepos}, 
    {value:req.body.cancersubtype, position:req.body.cancersubtypepos}, 
    {value:req.body.role, position:req.body.roleepos}, 
    {value:req.body.treatments, position:req.body.treatmentspos}, 
    {value:req.body.occupation, position:req.body.occupationpos}, 
    {value:req.body.gender, position:req.body.genderpos}, 
]

User.find({}, function(err, allusers) {

if(err) return res.send(err);

if(allusers == null) {
    Utils.send(res,"error", "there are no empty user")
} 
else {

for (var i = 0; i < allusers.length; i++) { 
    allusers[i].points = 0;
    for (var j=0; j< properties.length; j++)
    {
       if(allusers[i].language === properties[0].value)
       allusers[i].points +=  Math.exp(-properties[0].position)
       if(allusers[i].age >= properties[1].value &&  allusers[i].age <= properties[2].value)
       allusers[i].points +=  Math.exp(-properties[1].position)
       if(allusers[i].country === properties[3].value)
       allusers[i].points +=  Math.exp(-properties[3].position)
       if(allusers[i].state === properties[4].value)
       allusers[i].points +=  Math.exp(-properties[4].position)
       if(allusers[i].city === properties[5].value)
       allusers[i].points +=  Math.exp(-properties[5].position)
       if(allusers[i].status === properties[6].value)
       allusers[i].points +=  Math.exp(-properties[6].position)
       if(allusers[i].cancertype === properties[7].value)
       allusers[i].points +=  Math.exp(-properties[7].position)
       if(allusers[i].cancersubtype === properties[8].value)
       allusers[i].points +=  Math.exp(-properties[8].position)
       if(allusers[i].role === properties[9].value)
       allusers[i].points +=  Math.exp(-properties[9].position)
       if(allusers[i].treatments === properties[10].value)
       allusers[i].points +=  Math.exp(-properties[10].position)
       if(allusers[i].occupation === properties[11].value)
       allusers[i].points +=  Math.exp(-properties[11].position)
       if(allusers[i].gender === properties[12].value)
       allusers[i].points +=  Math.exp(-properties[12].position)
    }
console.log(allusers[i].points)

}

allusers.sort(function (a, b) {
  return b.points - a.points;
})

res.json(allusers)

}

})

}
